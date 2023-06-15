import { FC } from "react";
import m from "@styles/main.module.css";
import s from "./fixedLabel.module.css";

interface FixedLabelProps {
  value: number;
  isMaxLabel?: boolean;
}

const FixedLabel: FC<FixedLabelProps> = ({ value, isMaxLabel }) => {
  return (
    <div className={`${s.label} ${isMaxLabel ? m.rightAligned : ""}`}>
      {`${value} €`}
    </div>
  );
};

export default FixedLabel;
