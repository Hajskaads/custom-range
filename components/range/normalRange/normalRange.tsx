"use client";

import React, { useState, useRef, useEffect } from "react";
import s from "../range.module.css";
import { BulletType, NormalSliderDataOrErrorResponse } from "@lib/types";
import InputLabel from "./inputLabel";
import RangeBullet from "../shared/rangeBullet";
import RangeLine from "../shared/rangeLine";
import denormalizeValue from "@lib/denormalizeValue";
import normalizeValue from "@lib/normalizeValue";
import getNormalSliderRange from "@services/getNormalSliderRange";
import ErrorMessage from "@components/errorMessage";

const minBullet: BulletType = "min";
const maxBullet: BulletType = "max";

export interface NormalRangeProps {
  min: number;
  max: number;
}

const NormalRange: React.FC<NormalRangeProps> = ({ min, max }) => {
  const [minValue, setMinValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(100);
  const [minLabelValue, setMinLabelValue] = useState<string>(min.toString());
  const [maxLabelValue, setMaxLabelValue] = useState<string>(max.toString());
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeBullet, setActiveBullet] = useState<BulletType | null>(null);
  const [onTopBullet, setOnTopBullet] = useState<BulletType>("max");
  const rangeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseUp = () => {
      setIsDragging(false);
      setActiveBullet(null);
    };

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
  }, [isDragging, activeBullet, minValue, maxValue]);

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

export default async function NormalRangeWithProps() {
  //@ts-ignore
  const { min, max, error }: NormalSliderDataOrErrorResponse =
    await getNormalSliderRange();

  return min && max ? (
    <NormalRange min={min} max={max} />
  ) : (
    <ErrorMessage errorMessage={error} />
  );
}
