import React from "react";
import { render, fireEvent } from "@testing-library/react";
import RangeBullet from "@components/range/shared/rangeBullet";
import "@testing-library/jest-dom";

describe("RangeBullet", () => {
  const defaultProps = {
    offsetX: 50,
    bullet: "min",
    isOnTop: true,
    handleMouseDown: jest.fn(),
    isActive: true,
  };

  const testCases = [
    // Test case 1
    {
      ...defaultProps,
      offsetX: 0,
      bullet: "min",
      isOnTop: true,
      isActive: true,
    },
    // Test case 2
    {
      ...defaultProps,
      offsetX: 100,
      bullet: "max",
      isOnTop: false,
      isActive: true,
    },
    // Test case 3
    {
      ...defaultProps,
      offsetX: 100,
      bullet: "max",
      isOnTop: true,
      isActive: false,
    },
    // Test case 4
    {
      ...defaultProps,
      offsetX: 75,
      bullet: "min",
      isOnTop: false,
      isActive: false,
    },
  ];

  testCases.forEach((props, index) => {
    it(`renders the RangeBullet component correctly (test case ${
      index + 1
    })`, () => {
      const { container } = render(<RangeBullet {...props} />);
      const rangeBulletElement = container.firstChild;

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
      const { container } = render(<RangeBullet {...props} />);
      const rangeBulletElement = container.firstChild;

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
