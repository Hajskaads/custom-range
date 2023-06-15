import { FC } from "react";
import s from "./rangeBullet.module.css";

interface rangeBulletProps {
  isActive: boolean;
  offsetX: number;
  handleMouseDown: (
    bullet: "min" | "max",
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
}

const rangeBullet: FC<rangeBulletProps> = ({
  isActive,
  offsetX,
  handleMouseDown,
}) => {
  return (
    <div
      id="bullet-min"
      //   className={`range-bullet ${activeBullet === "min" ? "active" : ""}`}
      className={`absolute h-4 w-4 z-10 -top-1 bg-gray-500 rounded-full ${
        isActive ? "active" : ""
      }`}
      style={{ left: `${offsetX}%` }}
      onMouseDown={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
        handleMouseDown("min", e)
      }
    />
  );
};

export default rangeBullet;
