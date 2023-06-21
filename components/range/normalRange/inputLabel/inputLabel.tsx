import { FC } from "react";
import s from "./inputLabel.module.css";
import { BulletType } from "@lib/types";

interface InputLabelProps {
  value: string;
  min: number;
  max: number;
  bullet: BulletType;
  handleLabelChange: (
    newValue: string,
    bullet: BulletType,
    isError?: boolean
  ) => void;
}

const InputLabel: FC<InputLabelProps> = ({
  value,
  min,
  max,
  bullet,
  handleLabelChange,
}) => {
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const testRegex = new RegExp(
      `^[\\d]{0,${max.toString().length}}(\\.\\d{0,3})?$`
    );

    const newLabelValue = inputValue.replace(",", ".");
    const numericValue = parseFloat(newLabelValue.replace(",", "."));

    let newError = "";
    let newValue = "";

    // Test if the value is a decimal value where the decimal separator is "." or ","
    if (!testRegex.test(newLabelValue)) {
      newError = "Invalid input";
    } else {
      if (isNaN(numericValue)) {
        newError = "Invalid input";
      } else if (numericValue < min) {
        newError = `Value should be greater than or equal to ${min}`;
      } else if (numericValue > max) {
        newError = `Value should be less than or equal to ${max}`;
      } else {
      }
    }
    // If the number has more than two decimals, round it to 2 decimal digits
    if (/^\d+\.\d{3,}$/.test(newLabelValue)) {
      newValue = numericValue.toFixed(2);
    } else {
      newValue = newLabelValue;
    }

    handleLabelChange(newValue, bullet, !!newError);
    setError(newError);
  };

  return (
    <>
      <div
        className={`${s.root} ${bullet === "max" ? s.rightRoot : s.leftRoot}`}
      >
        <input
          id={`label-input-${bullet}`}
          aria-label={`Enter a ${bullet} slider number`}
          className={s.label}
          type="number"
          pattern={`^\d{0,${max.toString().length}}([.,]\d{1,2})?$`}
          value={value}
          onChange={handleChange}
          tabIndex={0}
        />
        <span className="absolute whitespace-nowrap text-bold text-md pr-3">
          €
        </span>
        {error && (
          <p className="absolute top-10 text-sm text-red-600">{error}</p>
        )}
      </div>
    </>
  );
};

export default InputLabel;

import React, { useState } from "react";
