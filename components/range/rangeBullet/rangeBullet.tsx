import { FC } from "react";
import s from "./rangeBullet.module.css";
import { BulletType } from "@lib/types";

interface RangeBulletProps {
  offsetX: number;
  bullet: BulletType;
  handleMouseDown: (
    bullet: BulletType,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  isActive?: boolean;
}

const RangeBullet: FC<RangeBulletProps> = ({
  offsetX,
  bullet,
  handleMouseDown,
  isActive,
}) => {
  return (
    <div
      id={`bullet-${bullet}`}
      className={s.bullet}
      style={{ left: `${offsetX}%` }}
      onMouseDown={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
        handleMouseDown(bullet, e)
      }
    />
  );
};

export default RangeBullet;
