import React from "react";
import { render, screen } from "@testing-library/react";
import Skelleton from "@components/range/shared/skelleton";
import "@testing-library/jest-dom";

describe("Skelleton", () => {
  it("renders the Skelleton component correctly", () => {
    const { container } = render(<Skelleton />);
    const skelletonElement = container.firstChild;

    expect(skelletonElement).toBeInTheDocument();
    expect(skelletonElement).toHaveClass("animate-pulse");
    expect(skelletonElement?.firstChild?.firstChild).toHaveClass("inputLabel");
  });

  it("renders the Skelleton component with fixed range styles when isFixedRange prop is true", () => {
    const { container } = render(<Skelleton isFixedRange />);
    const skelletonElement = container.firstChild;

    expect(skelletonElement).toBeInTheDocument();
    expect(skelletonElement).toHaveClass("animate-pulse");
    expect(skelletonElement?.firstChild?.firstChild).toHaveClass("fixedLabel");
  });
});
