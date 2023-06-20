import { FC } from "react";
import s from "./rangeBullet.module.css";
import { BulletType } from "@lib/types";

export interface RangeBulletProps {
  offsetX: number;
  bullet: BulletType;
  isOnTop: boolean;
  min: number;
  max: number;
  currentValue: number;
  handleMouseDown: (
    bullet: BulletType,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  isActive?: boolean;
}

const RangeBullet: FC<RangeBulletProps> = ({
  offsetX,
  bullet,
  isOnTop,
  min,
  max,
  currentValue,
  handleMouseDown,
  isActive,
}) => {
  return (
    <div
      id={`bullet-${bullet}`}
      className={`${s.bullet} ${isOnTop ? s.onTop : ""} ${
        isActive ? s.onDrag : ""
      }`}
      style={{ left: `calc(${offsetX}% - 0.5rem)` }}
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={currentValue}
      aria-valuetext={`${bullet}: ${currentValue}`}
      aria-labelledby={`${bullet}-slider-label`}
      onMouseDown={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
        handleMouseDown(bullet, e)
      }
    />
  );
};

export default RangeBullet;
