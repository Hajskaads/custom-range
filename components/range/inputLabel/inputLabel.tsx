import { FC } from "react";
import m from "@styles/main.module.css";
import s from "./inputLabel.module.css";
import { BulletType } from "@lib/types";

interface InputLabelProps {
  value: number;
  isRightAligned?: boolean;
  handleLabelClick: (
    event: React.MouseEvent<HTMLDivElement>,
    bullet: BulletType
  ) => void;
}

const InputLabel: FC<InputLabelProps> = ({
  value,
  isRightAligned,
  handleLabelClick,
}) => {
  return (
    <div
      className={`${s.label} ${isRightAligned ? m.rightAligned : ""}`}
      onClick={(e) => handleLabelClick(e, "min")}
    >
      {`${value} €`}
    </div>
  );
};

export default InputLabel;
