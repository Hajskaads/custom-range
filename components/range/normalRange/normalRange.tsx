"use client";

import React, { useState, useRef, useEffect } from "react";
import s from "../range.module.css";
import { BulletType } from "@lib/types";
import InputLabel from "./inputLabel/inputLabel";
import RangeBullet from "../shared/rangeBullet/rangeBullet";
import denormalizeValue from "@lib/denormalizeValue";

const minBullet: BulletType = "min";
const maxBullet: BulletType = "max";

const NormalRange: React.FC = () => {
  const [min, setMin] = useState<number>(10);
  const [max, setMax] = useState<number>(70);
  const [minValue, setMinValue] = useState<number>(10);
  const [maxValue, setMaxValue] = useState<number>(70);
  const [minLabelValue, setMinLabelValue] = useState<string>("10");
  const [maxLabelValue, setMaxLabelValue] = useState<string>("70");
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

      console.log("newValue", newValue);
      console.log(
        "normalizeValue(min, max, newValue)",
        denormalizeValue(min, max, newValue)
      );
      console.log("\n");

      if (
        activeBullet === minBullet &&
        newValue !== +minValue &&
        newValue > min - 50 // If the condition is removed, bullet is re-rendered when it doesn't make sense, and if newValue > min is left, when moving the cursor very quickly, the minimum is not reached.
      ) {
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
      } else if (
        activeBullet === maxBullet &&
        newValue !== +maxValue &&
        newValue < max * 1.5 // If the condition is removed, it is re-rendered when it doesn't make sense, and if newValue < max is left without a factor, when moving the cursor very quickly, the maximum is not reached.
      ) {
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

  const handleLabelChange = (newValue: string, bullet: BulletType): void => {
    // setActiveBullet(bullet);
    setOnTopBullet(bullet);
    if (bullet === minBullet) {
      setMinValue(+newValue);
    } else if (bullet === maxBullet) {
      setMaxValue(+newValue);
    }
  };

  return (
    <div className={s.root}>
      <InputLabel
        value={minLabelValue}
        min={min}
        max={+maxValue}
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
          offsetX={+maxValue}
          bullet={maxBullet}
          isOnTop={onTopBullet === maxBullet}
          handleMouseDown={handleBulletMouseDown}
        />
        <div className={s.rangeLine} />
      </div>
      <InputLabel
        value={maxLabelValue}
        min={+minValue}
        max={+max}
        bullet={maxBullet}
        handleLabelChange={handleLabelChange}
      />
    </div>
  );
};

export default NormalRange;
