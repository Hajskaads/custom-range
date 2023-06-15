import React, { useState, useRef, useEffect } from "react";
import s from "../styles/main.module.css";

const NormalRange: React.FC = () => {
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(100);
  const [minValue, setMinValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(100);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeBullet, setActiveBullet] = useState<"min" | "max" | null>(null);
  const rangeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseUp = () => {
      setIsDragging(false);
      setActiveBullet(null);
    };

    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleBulletMouseDown = (
    bullet: "min" | "max",
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setActiveBullet(bullet);
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging || !rangeRef.current) return;

      const range = rangeRef.current.getBoundingClientRect();
      const rangeWidth = range.width;
      const offsetX = event.clientX - range.left;

      const bulletWidth = 16; // Width of the bullet in px (adjust if needed)
      const centerOffset = bulletWidth / 2;
      const centeredOffsetX = offsetX - centerOffset;
      const newValue = (centeredOffsetX / rangeWidth) * 100;

      if (
        activeBullet === "min" &&
        newValue !== minValue &&
        newValue > min - 50 // Si quito la condición se rerenderiza cuando no tiene sentido, si dejo newValue > min al mover muy rápido el cursor no llega al mínimo.
      ) {
        const newMinValue = +Math.max(
          Math.min(newValue, maxValue),
          min
        ).toFixed(2);
        setMinValue(newMinValue);
      } else if (
        activeBullet === "max" &&
        newValue !== maxValue &&
        newValue < max * 1.5 // Si quito la condición se rerenderiza cuando no tiene sentido, si dejo newValue < max sin factor al mover muy rápido el cursor no llega al máximo.
      ) {
        const newMaxValue = +Math.min(
          Math.max(newValue, minValue),
          max
        ).toFixed(2);
        setMaxValue(newMaxValue);
      }
    };

    if (isDragging) {
      // @ts-ignore
      document.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      // @ts-ignore
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging, activeBullet, max, maxValue, min, minValue]);

  const handleLabelClick = (
    event: React.MouseEvent<HTMLDivElement>,
    bullet: "min" | "max"
  ) => {
    event.preventDefault();
    setActiveBullet(bullet);
  };

  return (
    // <div className="range-container">
    <div className="flex flex-row w-full items-center">
      {/* <div className="range-label" onClick={(e) => handleLabelClick(e, "min")}> */}
      <div
        className="range-label whitespace-nowrap"
        onClick={(e) => handleLabelClick(e, "min")}
        style={{ minWidth: "4.5rem" }}
      >
        {`${minValue} €`}
      </div>
      <div
        // className="range-line"
        className="w-full h-2 relative cursor-pointer"
        ref={rangeRef}
        // onMouseMove={handleMouseMove}
      >
        <div
          id="bullet-min"
          //   className={`range-bullet`}
          className={`absolute h-4 w-4 z-10 -top-1 bg-gray-500 rounded-full cursor-grab`}
          style={{ left: `${minValue}%` }}
          onMouseDown={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
            handleBulletMouseDown("min", e)
          }
        ></div>
        <div
          id="bullet-max"
          // ${s.bullet} // TODO: Si pongo el efecto de agrandar el bullet con CSS al arrastrar la bolita se retrasa mucho y va por detrás del cursor, hay un agujero de performance
          className={`absolute h-4 w-4 z-10 -top-1 bg-gray-500 rounded-full cursor-grab`}
          style={{ left: `${maxValue}%` }}
          onMouseDown={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
            handleBulletMouseDown("max", e)
          }
        ></div>
        <div
          //   className="range-line"
          className="bg-gray-500 w-full absolute left-0 top-0 h-2 rounded-l-full"
        ></div>
      </div>
      <div
        //   className="range-line-extension"
        className="bg-gray-500 w-4 h-2 rounded-r-full"
      ></div>
      <div
        className="range-label text-right whitespace-nowrap"
        style={{ minWidth: "4.5rem" }}
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
          handleLabelClick(e, "max")
        }
      >
        {`${maxValue} €`}
      </div>
    </div>
  );
};

export default NormalRange;
