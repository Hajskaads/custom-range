"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import s from "../range.module.css";
import FixedLabel from "./fixedLabel";
import RangeBullet from "../shared/rangeBullet";
import RangeLine from "../shared/rangeLine";
import { BulletType, FixedSliderDataOrErrorResponse } from "@lib/types";
import normalizeValue from "@lib/normalizeValue";
import denormalizeValue from "@lib/denormalizeValue";
import findClosestValue from "@lib/findClosestValue";
import getFixedSliderRange from "@services/getFixedSliderRange";
import ErrorMessage from "@components/errorMessage/errorMessage";

const minBullet: BulletType = "min";
const maxBullet: BulletType = "max";
const initialMin: number = 0;
const initialMax: number = 100;

export interface FixedRangeProps {
  rangeValues: number[];
}

const FixedRange: React.FC<FixedRangeProps> = async ({ rangeValues }) => {
  const [min, setMin] = useState<number>(Math.min(...rangeValues));
  const [max, setMax] = useState<number>(Math.max(...rangeValues));
  const [minValue, setMinValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(100);
  const [minNormalizedValue, setMinNormalizedValue] =
    useState<number>(initialMin);
  const [maxNormalizedValue, setMaxNormalizedValue] =
    useState<number>(initialMax);
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

      if (
        activeBullet === minBullet &&
        newValue !== minValue &&
        newValue > Math.min(...rangeValues) - 50 // If the condition is removed, bullet is re-rendered when it doesn't make sense, and if newValue > min is left, when moving the cursor very quickly, the minimum is not reached.
      ) {
        const newMinValue = +Math.max(
          Math.min(
            findClosestValue(
              denormalizeValue(min, max, newValue),
              rangeValues,
              false
            ),
            maxValue
          ),
          min
        ).toFixed(2);
        if (newMinValue !== minValue) {
          const newMinNormalized = normalizeValue(min, max, newMinValue);
          setMinValue(newMinValue);
          setMinNormalizedValue(newMinNormalized);
        }
      } else if (
        activeBullet === maxBullet &&
        newValue !== maxValue &&
        newValue < Math.max(...rangeValues) * 1.5 // If the condition is removed, it is re-rendered when it doesn't make sense, and if newValue < max is left without a factor, when moving the cursor very quickly, the maximum is not reached.
      ) {
        const newMaxValue = +Math.min(
          Math.max(
            findClosestValue(
              denormalizeValue(min, max, newValue),
              rangeValues,
              true
            ),
            minValue
          ),
          max
        ).toFixed(2);
        if (newMaxValue !== maxValue) {
          const newMaxNormalized = normalizeValue(min, max, newMaxValue);
          setMaxValue(newMaxValue);
          setMaxNormalizedValue(newMaxNormalized);
        }
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
  }, [isDragging, activeBullet, maxValue, minValue]);

  return (
    <div className={s.root}>
      <FixedLabel value={minValue} />
      <div className={s.container} ref={rangeRef}>
        <RangeBullet
          isActive={activeBullet === minBullet}
          offsetX={minNormalizedValue}
          bullet={minBullet}
          isOnTop={onTopBullet === minBullet}
          handleMouseDown={handleBulletMouseDown}
        />
        <RangeBullet
          isActive={activeBullet === maxBullet}
          offsetX={maxNormalizedValue}
          bullet={maxBullet}
          isOnTop={onTopBullet === maxBullet}
          handleMouseDown={handleBulletMouseDown}
        />
        <RangeLine isDragging={isDragging} />
      </div>
      <FixedLabel value={maxValue} isMaxLabel={true} />
    </div>
  );
};

export default async function NormalRangeWithProps() {
  //@ts-ignore
  const { data, error }: FixedSliderDataOrErrorResponse =
    await getFixedSliderRange();

  return data ? (
    <FixedRange rangeValues={data} />
  ) : (
    <ErrorMessage errorMessage={error} />
  );
}
