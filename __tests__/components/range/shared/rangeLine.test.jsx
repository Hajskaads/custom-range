import React from "react";
import { render } from "@testing-library/react";
import RangeLine from "@components/range/shared/rangeLine";
import "@testing-library/jest-dom";

describe("RangeLine", () => {
  it("renders the RangeLine component correctly", () => {
    const { container } = render(<RangeLine isDragging={false} />);
    const rangeLineElement = container.firstChild;

    expect(rangeLineElement).toBeInTheDocument();
    expect(rangeLineElement).toHaveClass("rangeLine");
    expect(rangeLineElement).not.toHaveClass("dragging");
  });

  it("renders the RangeLine component with dragging styles when isDragging prop is true", () => {
    const { container } = render(<RangeLine isDragging />);
    const rangeLineElement = container.firstChild;

    expect(rangeLineElement).toBeInTheDocument();
    expect(rangeLineElement).toHaveClass("rangeLine");
    expect(rangeLineElement).toHaveClass("dragging");
  });

  // Add more test cases as needed
});
