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
  handleKeyDown?: (bullet: BulletType, e: React.KeyboardEvent) => void;
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
  handleKeyDown,
  isActive,
}) => {
  return (
    <div
      id={`bullet-${bullet}`}
      aria-label={`bullet-${bullet}`}
      className={`${s.bullet} ${isOnTop ? s.onTop : ""} ${
        isActive ? s.onDrag : ""
      }`}
      style={{ left: `calc(${offsetX}% - 0.5rem)` }}
      role="slider"
      tabIndex={handleKeyDown ? 0 : undefined}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={currentValue}
      aria-valuetext={`${bullet}: ${currentValue}`}
      aria-labelledby={`bullet-${bullet}-slider`}
      onMouseDown={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
        handleMouseDown(bullet, e)
      }
      onKeyDown={(e: React.KeyboardEvent) => {
        if (handleKeyDown) {
          return handleKeyDown(bullet, e);
        }
      }}
    />
  );
};

export default RangeBullet;
