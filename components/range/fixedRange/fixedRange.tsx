"use client";

import React, { useState, useRef, useEffect } from "react";
import s from "../range.module.css";
import FixedLabel from "./fixedLabel/fixedLabel";
import RangeBullet from "../shared/rangeBullet/rangeBullet";
import { BulletType, FixedSliderDataOrErrorResponse } from "@lib/types";
import normalizeValue from "@lib/normalizeValue";
import denormalizeValue from "@lib/denormalizeValue";
import findClosestValue from "@lib/findClosestValue";
import getFixedSliderRange from "@services/getFixedSliderRange";

const minBullet: BulletType = "min";
const maxBullet: BulletType = "max";
const initialMin: number = 0;
const initialMax: number = 100;

const FixedRange: React.FC = () => {
  const [min, setMin] = useState<number>(initialMin);
  const [max, setMax] = useState<number>(initialMax);
  const [minValue, setMinValue] = useState<number>(initialMin);
  const [maxValue, setMaxValue] = useState<number>(initialMax);
  const [minNormalizedValue, setMinNormalizedValue] = useState<number>(0);
  const [maxNormalizedValue, setMaxNormalizedValue] = useState<number>(100);
  const [fixedValues, setFixedValues] = useState<number[]>([
    initialMin,
    initialMax,
  ]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeBullet, setActiveBullet] = useState<BulletType | null>(null);
  const [onTopBullet, setOnTopBullet] = useState<BulletType>("max");
  const rangeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function getRange() {
      const data: FixedSliderDataOrErrorResponse = await getFixedSliderRange();
      //@ts-ignore
      if (data.error) {
        //@ts-ignore
        setError(data.error);
      } else {
        //@ts-ignore
        const newMin = Math.min(...data);
        //@ts-ignore
        const newMax = Math.max(...data);
        //@ts-ignore
        setFixedValues(data);
        setMin(newMin);
        setMax(newMax);
        setMinValue(newMin);
        setMaxValue(newMax);
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

      if (
        activeBullet === minBullet &&
        newValue !== minValue &&
        newValue > Math.min(...fixedValues) - 50 // If the condition is removed, bullet is re-rendered when it doesn't make sense, and if newValue > min is left, when moving the cursor very quickly, the minimum is not reached.
      ) {
        const newMinValue = +Math.max(
          Math.min(
            findClosestValue(
              denormalizeValue(min, max, newValue),
              fixedValues,
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
        newValue < Math.max(...fixedValues) * 1.5 // If the condition is removed, it is re-rendered when it doesn't make sense, and if newValue < max is left without a factor, when moving the cursor very quickly, the maximum is not reached.
      ) {
        const newMaxValue = +Math.min(
          Math.max(
            findClosestValue(
              denormalizeValue(min, max, newValue),
              fixedValues,
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
        <div className={`${s.rangeLine} ${isDragging ? s.dragging : ""}`} />
      </div>
      <FixedLabel value={maxValue} isMaxLabel={true} />
    </div>
  );
};

export default FixedRange;
