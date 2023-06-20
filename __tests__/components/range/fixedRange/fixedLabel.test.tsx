import React from "react";
import { render } from "@testing-library/react";
import FixedLabel from "@components/range/fixedRange/fixedLabel";
import "@testing-library/jest-dom";

describe("FixedLabel", () => {
  const defaultProps = {
    value: 100,
    isMaxLabel: true,
  };

  it("renders the FixedLabel component correctly", () => {
    const { getByText } = render(<FixedLabel {...defaultProps} />);
    const labelElement = getByText("100 €");

    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveClass("label");
    expect(labelElement).toHaveClass("rightAligned");
  });

  it("renders the FixedLabel component without the 'rightAligned' class when isMaxLabel is false", () => {
    const props = {
      value: 50,
      isMaxLabel: false,
    };

    const { getByText } = render(<FixedLabel {...props} />);
    const labelElement = getByText("50 €");

    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveClass("label");
    expect(labelElement).not.toHaveClass("rightAligned");
  });
});
