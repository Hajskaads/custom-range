import React, { useState, useRef, useEffect } from "react";
import s from "../range.module.css";
import FixedLabel from "./fixedLabel/fixedLabel";
import RangeBullet from "../shared/rangeBullet/rangeBullet";
import { BulletType } from "@lib/types";

const minBullet: BulletType = "min";
const maxBullet: BulletType = "max";

const FixedRange: React.FC = () => {
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(100);
  const [minValue, setMinValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(100);
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
        newValue > min - 50 // If the condition is removed, bullet is re-rendered when it doesn't make sense, and if newValue > min is left, when moving the cursor very quickly, the minimum is not reached.
      ) {
        const newMinValue = +Math.max(
          Math.min(newValue, maxValue),
          min
        ).toFixed(2);
        setMinValue(newMinValue);
      } else if (
        activeBullet === maxBullet &&
        newValue !== maxValue &&
        newValue < max * 1.5 // If the condition is removed, it is re-rendered when it doesn't make sense, and if newValue < max is left without a factor, when moving the cursor very quickly, the maximum is not reached.
      ) {
        const newMaxValue = +Math.min(
          Math.max(newValue, minValue),
          max
        ).toFixed(2);
        setMaxValue(newMaxValue);
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

  return (
    <div className={s.root}>
      <FixedLabel value={minValue} />
      <div className={s.container} ref={rangeRef}>
        <RangeBullet
          isActive={activeBullet === minBullet}
          offsetX={minValue}
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
      <div className={s.rangeLineExtension} />
      <FixedLabel value={maxValue} isMaxLabel={true} />
    </div>
  );
};

export default FixedRange;
