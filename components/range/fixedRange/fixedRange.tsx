"use client";

import React, { useState, useRef, useEffect } from "react";
import s from "../range.module.css";
import FixedLabel from "./fixedLabel";
import RangeBullet from "../shared/rangeBullet";
import RangeLine from "../shared/rangeLine";
import { BulletType } from "@lib/types";
import normalizeValue from "@lib/normalizeValue";
import denormalizeValue from "@lib/denormalizeValue";
import findClosestValue from "@lib/findClosestValue";
import ErrorMessage from "@components/errorMessage";
import Skelleton from "../shared/skelleton";
import { useFetch } from "@lib/useFetch";

const minBullet: BulletType = "min";
const maxBullet: BulletType = "max";
const initialMin: number = 0;
const initialMax: number = 100;

const FixedRange: React.FC = () => {
  const [minValue, setMinValue] = useState<number>(initialMin);
  const [maxValue, setMaxValue] = useState<number>(initialMax);
  const [minNormalizedValue, setMinNormalizedValue] =
    useState<number>(initialMin);
  const [maxNormalizedValue, setMaxNormalizedValue] =
    useState<number>(initialMax);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeBullet, setActiveBullet] = useState<BulletType | null>(null);
  const [onTopBullet, setOnTopBullet] = useState<BulletType>("max");
  const rangeRef = useRef<HTMLDivElement | null>(null);

  const { rangeValues, min, max, loading, error } = useFetch(true);

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

  useEffect(() => {
    if (min && max) {
      setMinValue(min);
      setMaxValue(max);
    }
  }, [min, max]);

  const handleBulletMouseDown = (
    bullet: BulletType,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    setActiveBullet(bullet);
    setOnTopBullet(bullet);
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging || !rangeRef.current) return;

      const range = rangeRef.current.getBoundingClientRect();
      const rangeWidth = range.width;
      const offsetX = event.clientX - range.left;
      const newValue = (offsetX / rangeWidth) * 100;

      if (
        activeBullet === minBullet &&
        newValue !== minValue &&
        rangeValues &&
        min &&
        max &&
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
        rangeValues &&
        min &&
        max &&
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
      document.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging, activeBullet, maxValue, minValue]);

  if (
    !error &&
    (loading ||
      min === null ||
      max === null ||
      rangeValues === null ||
      rangeValues.length < 2)
  ) {
    return <Skelleton isFixedRange={true} />;
  }

  if (error) {
    return <ErrorMessage errorMessage={error} />;
  }

  return (
    <div className={s.root}>
      <FixedLabel value={minValue} />
      <div className={s.container} ref={rangeRef}>
        <RangeBullet
          isActive={activeBullet === minBullet}
          offsetX={minNormalizedValue}
          bullet={minBullet}
          isOnTop={onTopBullet === minBullet}
          min={min as number}
          max={maxValue}
          currentValue={minValue}
          handleMouseDown={handleBulletMouseDown}
        />
        <RangeBullet
          isActive={activeBullet === maxBullet}
          offsetX={maxNormalizedValue}
          bullet={maxBullet}
          isOnTop={onTopBullet === maxBullet}
          min={minValue}
          max={max as number}
          currentValue={maxValue}
          handleMouseDown={handleBulletMouseDown}
        />
        <RangeLine isDragging={isDragging} />
      </div>
      <FixedLabel value={maxValue} isMaxLabel={true} />
    </div>
  );
};

export default FixedRange;
