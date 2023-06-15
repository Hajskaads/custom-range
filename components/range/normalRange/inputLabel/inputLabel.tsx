import { FC } from "react";
import m from "@styles/main.module.css";
import s from "./inputLabel.module.css";
import { BulletType } from "@lib/types";

interface InputLabelProps {
  value: number;
  min: number;
  max: number;
  bullet: BulletType;
  handleLabelChange: (newValue: string, bullet: BulletType) => void;
}

// Helper function to check if a number has decimal values
const hasDecimalValues = (number: number) => {
  return Math.floor(number) !== number;
};

const InputLabel: FC<InputLabelProps> = ({
  value,
  min,
  max,
  bullet,
  handleLabelChange,
}) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    let newError = "";
    let newValue = "";
    // if (/^[\d]{0,5}(\.\d{0,3})?$/.test(newValue)) {
    //   setValue(newValue);
    // }

    // if (value === "0." || value === ".") {
    //   // value.toString().slice(-1) === '.' ? value : +value
    //   setTonFacturaLuz("0.");
    //   setKgCo2FacturaLuz(0);
    // } else {
    //   kgFacturaLuz = +value * 1000;
    //   setTonFacturaLuz(value.indexOf(".") > -1 ? value : +value);
    // }
    if (inputValue === "") {
      newValue = "0";
      // Test if the value is a decimal value where the decimal separator is "." or ","
    } else if (!/^[\d]{0,3}(\.\d{0,3})?$/.test(inputValue)) {
      newError = "Invalid input";
    } else {
      const numericValue = parseFloat(inputValue.replace(",", "."));
      if (inputValue === ".") {
        newValue = "0";
      } else if (isNaN(numericValue)) {
        newError = "Invalid input";
      } else if (numericValue < min) {
        newError = `Value should be greater than or equal to ${min}`;
      } else if (numericValue > max) {
        newError = `Value should be less than or equal to ${max}`;
      } else {
        // If the number is decimal, round it to 2 decimal digits
        newValue = hasDecimalValues(numericValue)
          ? numericValue.toFixed(2)
          : numericValue.toString();
      }
    }
    handleLabelChange(newValue, bullet);
    setError(newError);
  };

  return (
    <>
      <div
        className={`${s.root} ${bullet === "max" ? s.rightRoot : s.leftRoot}`}
      >
        {/* <div
        className={`${s.label} ${isRightAligned ? m.rightAligned : ""}`}
        onClick={(e) => handleLabelClick(e, "min")}
        >
        {`${value} €`}
      </div> */}
        <input
          className={s.label}
          type="text"
          pattern="^\d{0,3}(\.\d{1,2})?$"
          value={value}
          onChange={handleChange}
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

// const NumberInput = ({ min, max }) => {
//   const [value, setValue] = useState("");
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     const inputValue = e.target.value;
//     setValue(inputValue);

//     if (inputValue !== "") {
//       const numericValue = parseFloat(inputValue);
//       if (isNaN(numericValue)) {
//         setError("Invalid input");
//       } else if (numericValue < min || numericValue > max) {
//         setError(`Value should be between ${min} and ${max}`);
//       } else {
//         setError("");
//       }
//     } else {
//       setError("");
//     }
//   };

//   return (
//     <div>
//       <input type="number" value={value} onChange={handleChange} />
//       {error && <p>{error}</p>}
//     </div>
//   );
// };

// Usage:
// const MyComponent = () => {
//   return (
//     <div>
//       <NumberInput min={0} max={100} />
//     </div>
//   );
// };
