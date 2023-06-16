"use client";

import React, { useState, useRef, useEffect } from "react";
import s from "../range.module.css";
import FixedLabel from "./fixedLabel/fixedLabel";
import RangeBullet from "../shared/rangeBullet/rangeBullet";
import { BulletType } from "@lib/types";
import normalizeValue from "@lib/normalizeValue";
import transformToPercentage from "@lib/transformToPercentage";
import findClosestValue from "@lib/findClosestValue";

const minBullet: BulletType = "min";
const maxBullet: BulletType = "max";

const FixedRange: React.FC = () => {
  const [min, setMin] = useState<number>(1.99);
  const [max, setMax] = useState<number>(70.99);
  const [minValue, setMinValue] = useState<number>(1.99);
  const [maxValue, setMaxValue] = useState<number>(70.99);
  const [fixedValues, setFixedValues] = useState<number[]>([
    1.99, 5.99, 10.99, 30.99, 50.99, 70.99,
  ]);
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

      const bulletWidth = 16; // Width of the bullet in px (adjust if needed)
      const centerOffset = bulletWidth / 2;
      const centeredOffsetX = offsetX - centerOffset;
      const newValue = (centeredOffsetX / rangeWidth) * 100;

      if (
        activeBullet === minBullet &&
        newValue !== minValue &&
        newValue > Math.min(...fixedValues) - 50 // If the condition is removed, bullet is re-rendered when it doesn't make sense, and if newValue > min is left, when moving the cursor very quickly, the minimum is not reached.
      ) {
        console.log("fixedValues", fixedValues);
        console.log("newValue", newValue);
        console.log("min", min);
        console.log("max", max);
        console.log("normalizeValue", normalizeValue(min, max, newValue));
        console.log(
          "findClosestValue",
          findClosestValue(
            normalizeValue(min, max, newValue),
            fixedValues,
            false
          )
        );
        console.log("\n");

        const newMinValue = +Math.max(
          Math.min(
            findClosestValue(
              normalizeValue(min, max, newValue),
              fixedValues,
              false
            ),
            // normalizeValue(minValue, maxValue, newValue)
            maxValue
          ),
          min
        ).toFixed(2);
        if (newMinValue !== minValue) {
          setMinValue(newMinValue);
        }
      } else if (
        activeBullet === maxBullet &&
        newValue !== maxValue &&
        newValue < Math.max(...fixedValues) * 1.5 // If the condition is removed, it is re-rendered when it doesn't make sense, and if newValue < max is left without a factor, when moving the cursor very quickly, the maximum is not reached.
      ) {
        console.log("newValue", newValue);
        const newMaxValue = +Math.min(
          Math.max(
            findClosestValue(
              normalizeValue(min, max, newValue),
              fixedValues,
              true
            ),
            minValue
          ),
          max
        ).toFixed(2);
        if (newMaxValue !== minValue) {
          setMaxValue(newMaxValue);
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
          offsetX={transformToPercentage(minValue, fixedValues)}
          bullet={minBullet}
          isOnTop={onTopBullet === minBullet}
          handleMouseDown={handleBulletMouseDown}
        />
        <RangeBullet
          isActive={activeBullet === maxBullet}
          offsetX={transformToPercentage(maxValue, fixedValues)}
          bullet={maxBullet}
          isOnTop={onTopBullet === maxBullet}
          handleMouseDown={handleBulletMouseDown}
        />
        <div className={`${s.rangeLine} ${isDragging ? s.dragging : ""}`} />
      </div>
      <div className={s.rangeLineExtension} />
      <FixedLabel value={maxValue} isMaxLabel={true} />
    </div>
  );
};

export default FixedRange;
