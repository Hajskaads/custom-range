"use client";

import React, { useState, useRef, useEffect } from "react";
import s from "../range.module.css";
import m from "@styles/main.module.css";
import {
  BulletType,
  NormalSliderDataOrErrorResponse,
  NormalSliderDataResponse,
} from "@lib/types";
import InputLabel from "./inputLabel/inputLabel";
import RangeBullet from "../shared/rangeBullet/rangeBullet";
import denormalizeValue from "@lib/denormalizeValue";
import normalizeValue from "@lib/normalizeValue";
import getNormalSliderRange from "@services/getNormalSliderRange";

const minBullet: BulletType = "min";
const maxBullet: BulletType = "max";

const NormalRange: React.FC = () => {
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(100);
  const [minValue, setMinValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(100);
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
        const newMinNormalized = denormalizeValue(min, max, newMin).toString();
        //@ts-ignore
        const newMax = data.max;
        const newMaxNormalized = denormalizeValue(min, max, newMax).toString();
        setMin(newMin);
        setMinLabelValue(newMinNormalized);
        setMax(newMax);
        setMaxLabelValue(newMaxNormalized);
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
        newValue !== +minValue //&&
        // newValue > min - 50 // If the condition is removed, bullet is re-rendered when it doesn't make sense, and if newValue > min is left, when moving the cursor very quickly, the minimum is not reached.
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
        newValue !== +maxValue //&&
        // newValue < max * 1.5 // If the condition is removed, it is re-rendered when it doesn't make sense, and if newValue < max is left without a factor, when moving the cursor very quickly, the maximum is not reached.
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
