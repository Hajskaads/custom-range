import { FC } from "react";
import s from "./rangeLine.module.css";

export interface RangeLineProps {
  isDragging: boolean;
}

const RangeLine: FC<RangeLineProps> = ({ isDragging }) => {
  return <div className={`${s.rangeLine} ${isDragging ? s.dragging : ""}`} />;
};

export default RangeLine;
