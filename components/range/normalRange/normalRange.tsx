"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import s from "../range.module.css";
import { BulletType, NormalSliderResponse } from "@lib/types";
import InputLabel from "./inputLabel";
import RangeBullet from "../shared/rangeBullet";
import RangeLine from "../shared/rangeLine";
import denormalizeValue from "@lib/denormalizeValue";
import normalizeValue from "@lib/normalizeValue";
import getNormalSliderRange from "@services/getNormalSliderRange";
import ErrorMessage from "@components/errorMessage";
import Skelleton from "../shared/skelleton";

const minBullet: BulletType = "min";
const maxBullet: BulletType = "max";
const initialMin: number = 0;
const initialMax: number = 100;

const NormalRange: React.FC = () => {
  const [min, setMin] = useState<number>(initialMin);
  const [max, setMax] = useState<number>(initialMax);
  const [minValue, setMinValue] = useState<number>(initialMin);
  const [maxValue, setMaxValue] = useState<number>(initialMax);
  const [minLabelValue, setMinLabelValue] = useState<string>(
    initialMin.toString()
  );
  const [maxLabelValue, setMaxLabelValue] = useState<string>(
    initialMax.toString()
  );
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [activeBullet, setActiveBullet] = useState<BulletType | null>(null);
  const [onTopBullet, setOnTopBullet] = useState<BulletType>("max");
  const rangeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function getRange() {
      const { min, max, error }: NormalSliderResponse =
        await getNormalSliderRange();
      if (error) {
        setError(error);
        setLoading(false);
      } else if (min && max) {
        setMin(min);
        setMinLabelValue(min.toString());
        setMax(max);
        setMaxLabelValue(max.toString());
        setLoading(false);
      }
    }
    const handleMouseUp = () => {
      setIsDragging(false);
      setActiveBullet(null);
    };

    getRange();
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleBulletMouseDown = (
    bullet: BulletType,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    setActiveBullet(bullet);
    setOnTopBullet(bullet);
    setIsDragging(true);
  };

  const handleBulletChange = useCallback(
    (newValue: number, activeBullet: string) => {
      if (activeBullet === minBullet && newValue !== +minValue) {
        const newMinValue = +Math.max(Math.min(newValue, maxValue), 0).toFixed(
          2
        );
        setMinValue(newMinValue);
        const newMinLabelValue: string = Math.min(
          denormalizeValue(min, max, +minValue),
          +maxLabelValue
        ).toFixed(0);
        setMinLabelValue(newMinLabelValue);
      } else if (activeBullet === maxBullet && newValue !== +maxValue) {
        const newMaxValue = +Math.min(
          Math.max(newValue, minValue),
          100
        ).toFixed(2);
        setMaxValue(newMaxValue);
        const newMaxLabelValue: string = Math.max(
          denormalizeValue(min, max, +maxValue),
          +minLabelValue
        ).toFixed(0);
        setMaxLabelValue(
          Math.max(+newMaxLabelValue, +minLabelValue).toFixed(0)
        );
      }
    },
    [minValue, maxValue, min, max]
  );

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging || !rangeRef.current) return;

      const range = rangeRef.current.getBoundingClientRect();
      const rangeWidth = range.width;
      const offsetX = event.clientX - range.left;
      const newValue = (offsetX / rangeWidth) * 100;

      if (activeBullet) {
        handleBulletChange(newValue, activeBullet);
      }
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging, activeBullet, handleBulletChange]);

  const handleLabelChange = (
    newValue: string,
    bullet: BulletType,
    isError?: boolean
  ): void => {
    setOnTopBullet(bullet);
    if (bullet === minBullet) {
      setMinLabelValue(newValue);
      if (!isError) {
        setMinValue(normalizeValue(min, max, +newValue));
      }
    } else if (bullet === maxBullet) {
      setMaxLabelValue(newValue);
      if (!isError) {
        setMaxValue(normalizeValue(min, max, +newValue));
      }
    }
  };

  const handleBulletKeyDown = (
    bullet: BulletType,
    event: React.KeyboardEvent
  ): void => {
    setActiveBullet(bullet);
    setOnTopBullet(bullet);
    let Xstart: number = 0;
    if (bullet === "min") {
      Xstart = minValue;
    } else if (bullet === "max") {
      Xstart = maxValue;
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      handleBulletChange(Xstart - 1, bullet);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      handleBulletChange(Xstart + 1, bullet);
    }
  };

  if (loading) {
    return <Skelleton />;
  }

  if (error) {
    return <ErrorMessage errorMessage={error} />;
  }

  return (
    <div className={s.root}>
      <InputLabel
        value={minLabelValue}
        min={min}
        max={+maxLabelValue}
        bullet={minBullet}
        handleLabelChange={handleLabelChange}
      />
      <div className={s.container} ref={rangeRef}>
        <RangeBullet
          isActive={activeBullet === minBullet}
          offsetX={+minValue}
          bullet={minBullet}
          isOnTop={onTopBullet === minBullet}
          min={min}
          max={+maxLabelValue}
          currentValue={+minLabelValue}
          handleMouseDown={handleBulletMouseDown}
          handleKeyDown={handleBulletKeyDown}
        />
        <RangeBullet
          isActive={activeBullet === maxBullet}
          offsetX={maxValue}
          bullet={maxBullet}
          isOnTop={onTopBullet === maxBullet}
          min={+minLabelValue}
          max={max}
          currentValue={+maxLabelValue}
          handleMouseDown={handleBulletMouseDown}
          handleKeyDown={handleBulletKeyDown}
        />
        <RangeLine isDragging={isDragging} />
      </div>
      <InputLabel
        value={maxLabelValue}
        min={+minLabelValue}
        max={max}
        bullet={maxBullet}
        handleLabelChange={handleLabelChange}
      />
    </div>
  );
};

export default NormalRange;
