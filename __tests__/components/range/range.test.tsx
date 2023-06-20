import React from "react";
import { render, screen } from "@testing-library/react";
import Range from "@components/range";
import NormalRange from "@components/range/normalRange";
import FixedRange from "@components/range/fixedRange";
import "@testing-library/jest-dom";

jest.mock("components/range/fixedRange", () => {
  return jest.fn(() => (
    <div className="fixed-range" data-testid="fixed-range">
      Fixed Range Component
    </div>
  ));
});

jest.mock("components/range/normalRange", () => {
  return jest.fn(() => (
    <div className="normal-range" data-testid="normal-range">
      Normal Range Component
    </div>
  ));
});

describe("Range", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render FixedRange when isFixedRange prop is true", () => {
    render(<Range isFixedRange={true} />);
    expect(FixedRange).toHaveBeenCalledTimes(1);
    expect(screen.queryByTestId("fixed-range")).toBeInTheDocument();
  });

  it("should render NormalRange when isFixedRange prop is false", () => {
    render(<Range isFixedRange={false} />);
    expect(NormalRange).toHaveBeenCalledTimes(1);
    expect(screen.queryByTestId("normal-range")).toBeInTheDocument();
  });
});
