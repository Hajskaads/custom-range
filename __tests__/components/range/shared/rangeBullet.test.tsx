import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RangeBullet, {
  RangeBulletProps,
} from "@components/range/shared/rangeBullet/rangeBullet";
import "@testing-library/jest-dom";
import normalizeValue from "@lib/normalizeValue";
import { BulletType } from "@lib/types";

describe("RangeBullet", () => {
  const defaultProps: RangeBulletProps = {
    offsetX: normalizeValue(10, 70, 50),
    bullet: "min" as BulletType,
    isOnTop: true,
    min: 10,
    max: 70,
    currentValue: 50,
    handleMouseDown: jest.fn(),
    isActive: true,
  };

  const testCases = [
    // Test case 1
    {
      ...defaultProps,
      offsetX: normalizeValue(10, 70, 0),
      bullet: "min" as BulletType,
      isOnTop: true,
      min: 10,
      max: 70,
      currentValue: 0,
      isActive: true,
    },
    // Test case 2
    {
      ...defaultProps,
      offsetX: normalizeValue(10, 70, 70),
      bullet: "max" as BulletType,
      isOnTop: false,
      min: 10,
      max: 70,
      currentValue: 70,
      isActive: true,
    },
    // Test case 3
    {
      ...defaultProps,
      offsetX: normalizeValue(10, 70, 70),
      bullet: "max" as BulletType,
      isOnTop: true,
      min: 10,
      max: 70,
      currentValue: 50,
      isActive: false,
    },
    // Test case 4
    {
      ...defaultProps,
      offsetX: normalizeValue(10, 70, 45),
      bullet: "min" as BulletType,
      isOnTop: false,
      min: 10,
      max: 70,
      currentValue: 45,
      isActive: false,
    },
  ];

  testCases.forEach((props, index) => {
    it(`renders the RangeBullet component correctly (test case ${
      index + 1
    })`, () => {
      render(<RangeBullet {...props} />);
      const rangeBulletElement = screen.getByRole("slider");
      expect(rangeBulletElement).toBeInTheDocument();

      expect(rangeBulletElement).toBeInTheDocument();
      expect(rangeBulletElement).toHaveClass("bullet");
      if (props.isOnTop) {
        expect(rangeBulletElement).toHaveClass("onTop");
      } else {
        expect(rangeBulletElement).not.toHaveClass("onTop");
      }
      if (props.isActive) {
        expect(rangeBulletElement).toHaveClass("onDrag");
      } else {
        expect(rangeBulletElement).not.toHaveClass("onDrag");
      }
      expect(rangeBulletElement).toHaveStyle({
        left: `calc(${props.offsetX}% - 0.5rem)`,
      });
    });

    it(`calls the handleMouseDown function when the RangeBullet is clicked (test case ${
      index + 1
    })`, () => {
      render(<RangeBullet {...props} />);
      const rangeBulletElement = screen.getByRole("slider");
      // @ts-ignore
      props.handleMouseDown.mockClear(); // Reset the mock function

      fireEvent.mouseDown(rangeBulletElement);

      expect(props.handleMouseDown).toHaveBeenCalledTimes(1);
      expect(props.handleMouseDown).toHaveBeenCalledWith(
        props.bullet,
        expect.anything()
      );
    });
  });
});
