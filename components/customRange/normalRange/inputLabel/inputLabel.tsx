import { FC } from "react";
import s from "./inputLabel.module.css";

interface InputLabelProps {
  value: number;
  handleLabelClick: (
    event: React.MouseEvent<HTMLDivElement>,
    bullet: "min" | "max"
  ) => void;
}

const InputLabel: FC<InputLabelProps> = ({ value, handleLabelClick }) => {
  return (
    <div
      className="range-label whitespace-nowrap"
      onClick={(e) => handleLabelClick(e, "min")}
      style={{ minWidth: "4.5rem" }}
    >
      {`${value} €`}
    </div>
  );
};

export default InputLabel;
