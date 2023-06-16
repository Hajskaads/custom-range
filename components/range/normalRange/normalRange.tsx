"use client";

import React, { useState, useRef, useEffect } from "react";
import s from "../range.module.css";
import m from "@styles/main.module.css";
import { BulletType, NormalSliderDataOrErrorResponse } from "@lib/types";
import InputLabel from "./inputLabel/inputLabel";
import RangeBullet from "../shared/rangeBullet/rangeBullet";
import denormalizeValue from "@lib/denormalizeValue";
import normalizeValue from "@lib/normalizeValue";
import getNormalSliderRange from "@services/getNormalSliderRange";

const minBullet: BulletType = "min";
const maxBullet: BulletType = "max";
const initialMin: number = 0;
const initialMax: number = 100;

const NormalRange: React.FC = () => {
  const [min, setMin] = useState<number>(initialMin);
  const [max, setMax] = useState<number>(initialMax);
  const [minValue, setMinValue] = useState<number>(initialMin);
  const [maxValue, setMaxValue] = useState<number>(initialMax);
  const [minLabelValue, setMinLabelValue] = useState<string>("0");
  const [maxLabelValue, setMaxLabelValue] = useState<string>("100");
  const [error, setError] = useState<string>("");
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeBullet, setActiveBullet] = useState<BulletType | null>(null);
  const [onTopBullet, setOnTopBullet] = useState<BulletType>("max");
  const rangeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function getRange() {
      const data: NormalSliderDataOrErrorResponse =
        await getNormalSliderRange();
      //@ts-ignore
      if (data.error) {
        //@ts-ignore
        setError(data.error);
      } else {
        //@ts-ignore
        const newMin = data.min;
        const newMinDenormalized = denormalizeValue(
          min,
          max,
          newMin
        ).toString();
        //@ts-ignore
        const newMax = data.max;
        const newMaxDenormalized = denormalizeValue(
          min,
          max,
          newMax
        ).toString();
        setMin(newMin);
        setMinLabelValue(newMinDenormalized);
        setMax(newMax);
        setMaxLabelValue(newMaxDenormalized);
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

  useEffect(() => {
    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging || !rangeRef.current) return;

      const range = rangeRef.current.getBoundingClientRect();
      const rangeWidth = range.width;
      const offsetX = event.clientX - range.left;
      const newValue = (offsetX / rangeWidth) * 100;

      if (activeBullet === minBullet && newValue !== +minValue) {
        const newMinValue = +Math.max(Math.min(newValue, maxValue), 0).toFixed(
          2
        );
        setMinValue(newMinValue);
        const newMinLabelValue: string = denormalizeValue(
          min,
          max,
          +minValue
        ).toFixed(0);
        setMinLabelValue(newMinLabelValue);
      } else if (activeBullet === maxBullet && newValue !== +maxValue) {
        const newMaxValue = +Math.min(
          Math.max(newValue, minValue),
          100
        ).toFixed(2);
        setMaxValue(newMaxValue);
        const newMaxLabelValue: string = denormalizeValue(
          min,
          max,
          +maxValue
        ).toFixed(0);
        setMaxLabelValue(newMaxLabelValue);
      }
    };

    if (isDragging) {
      // @ts-ignore
      document.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      // @ts-ignore
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging, activeBullet, max, maxValue, min, minValue]);

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

  if (error) {
    return <div className={`${s.root} ${m.centerAligned}`}>{error}</div>;
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
          handleMouseDown={handleBulletMouseDown}
        />
        <RangeBullet
          isActive={activeBullet === maxBullet}
          offsetX={maxValue}
          bullet={maxBullet}
          isOnTop={onTopBullet === maxBullet}
          handleMouseDown={handleBulletMouseDown}
        />
        <div className={s.rangeLine} />
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
