import React, { useState, useRef, useEffect } from "react";
import s from "../range.module.css";
import FixedLabel from "./fixedLabel/fixedLabel";
import RangeBullet from "../shared/rangeBullet/rangeBullet";
import { BulletType } from "@lib/types";

const minBullet: BulletType = "min";
const maxBullet: BulletType = "max";

/**
 * Finds the value in the given array that is closest to the target number.
 * If the target number is exactly between two values, it returns the highest or lowest value based on the isMax flag.
 *
 * @param {number[]} numbers - Array of numbers to search.
 * @param {number} target - Target number.
 * @param {boolean} isMax - Flag indicating whether to return the highest or lowest value when equidistant.
 * @returns {number} - The value in the array that is closest to the target number.
 */
function findClosestValue(
  target: number,
  numbers: number[],
  isMax: boolean
): number {
  let closestValue = numbers[0];

  // Iterate over the numbers array
  for (let i = 1; i < numbers.length; i++) {
    const currentNumber = numbers[i];

    // Check if the absolute difference between the current number and target is smaller than the closest difference so far
    if (Math.abs(currentNumber - target) < Math.abs(closestValue - target)) {
      closestValue = currentNumber;
    } else if (
      Math.abs(currentNumber - target) === Math.abs(closestValue - target)
    ) {
      // Check if the numbers are equidistant from the target
      if (isMax) {
        closestValue = Math.max(currentNumber, closestValue);
      } else {
        closestValue = Math.min(currentNumber, closestValue);
      }
    }
  }

  return closestValue;
}

/**
 * Transforms a given number from an array to a percentage based on the minimum and maximum values of the array.
 * @param {number} number - The input number to be transformed.
 * @param {number[]} array - The array of numbers.
 * @returns {number} - The percentage value corresponding to the input number.
 */
function transformToPercentage(number: number, array: number[]) {
  const minValue = Math.min(...array);
  const maxValue = Math.max(...array);

  const percentage = ((number - minValue) / (maxValue - minValue)) * 100;
  return percentage;
}

/**
 * Transforms an array of numbers to a percentage scale based on the minimum and maximum values.
 * @param {number[]} array - The array of numbers.
 * @returns {number[]} - The array of numbers transformed to a percentage scale.
 */
function transformArrayToPercentage(array: number[]) {
  // Find the minimum and maximum values in the array
  const minValue = Math.min(...array);
  const maxValue = Math.max(...array);

  // Calculate the percentage for each number in the array
  const percentageArray = array.map((number) => {
    return ((number - minValue) / (maxValue - minValue)) * 100;
  });

  // Return the array of numbers transformed to a percentage scale
  return percentageArray;
}

const FixedRange: React.FC = () => {
  const [minValue, setMinValue] = useState<number>(1.99);
  const [maxValue, setMaxValue] = useState<number>(70.99);
  const [fixedValues, setFixedValues] = useState<number[]>([
    1.99, 5.99, 10.99, 30.99, 50.99, 70.99,
  ]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeBullet, setActiveBullet] = useState<BulletType | null>(null);
  const [onTopBullet, setOnTopBullet] = useState<BulletType>("max");
  const rangeRef = useRef<HTMLDivElement | null>(null);

  const fixedValuesToPercentage: number[] =
    transformArrayToPercentage(fixedValues);

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
        const newMinValue = +Math.max(
          Math.min(
            findClosestValue(newValue, fixedValuesToPercentage, false),
            maxValue
          ),
          Math.min(...fixedValues)
        ).toFixed(2);
        setMinValue(newMinValue);
      } else if (
        activeBullet === maxBullet &&
        newValue !== maxValue &&
        newValue < Math.max(...fixedValues) * 1.5 // If the condition is removed, it is re-rendered when it doesn't make sense, and if newValue < max is left without a factor, when moving the cursor very quickly, the maximum is not reached.
      ) {
        const newMaxValue = +Math.min(
          Math.max(
            findClosestValue(newValue, fixedValuesToPercentage, true),
            minValue
          ),
          Math.max(...fixedValues)
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
