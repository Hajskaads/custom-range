import React from "react";
import { render, act, screen } from "@testing-library/react";
import FixedRange from "@components/range/fixedRange";
import ErrorMessage from "@components/errorMessage";
import FixedLabel from "@components/range/fixedRange/fixedLabel";
import RangeBullet from "@components/range/shared/rangeBullet";
import RangeLine from "@components/range/shared/rangeLine";
import getFixedSliderRange from "@services/getFixedSliderRange";
import "@testing-library/jest-dom";

jest.mock("components/errorMessage", () => {
  return jest.fn(() => (
    <div className="error-message" data-testid="error-message">
      Error Message Component
    </div>
  ));
});

jest.mock("components/range/fixedRange/fixedLabel", () => {
  return jest.fn(() => (
    <div className="fixedLabel" data-testid="fixedLabel">
      Fixed Label Component
    </div>
  ));
});

jest.mock("components/range/shared/rangeBullet", () => {
  return jest.fn(() => (
    <div className="rangeBullet" data-testid="rangeBullet">
      Range Bullet Component
    </div>
  ));
});

jest.mock("components/range/shared/rangeLine", () => {
  return jest.fn(() => (
    <div className="rangeLine" data-testid="rangeLine">
      Range Line Component
    </div>
  ));
});

jest.mock("services/getFixedSliderRange", () => {
  return jest.fn().mockResolvedValue({ rangeValues: [0, 10, 40, 70, 100] });
});

describe("FixedRange", () => {
  beforeEach(() => {
    getFixedSliderRange.mockImplementation(() =>
      Promise.resolve({ rangeValues: [0, 10, 40, 70, 100] })
    );
  });

  it("renders the component without error", async () => {
    await act(async () => {
      render(<FixedRange />);
    });
  });

  it("displays the error message when there is an error", async () => {
    getFixedSliderRange.mockImplementation(() =>
      Promise.resolve({ error: "Something went wrong" })
    );
    await act(async () => {
      render(<FixedRange />);
    });
    expect(ErrorMessage).toHaveBeenCalledTimes(1);
    expect(screen.queryByTestId("error-message")).toBeInTheDocument();
  });

  it("displays the all the subcomponents of FixedRange when rangeValues is correct", async () => {
    getFixedSliderRange.mockImplementation(() =>
      Promise.resolve({ rangeValues: [0, 10, 40, 70, 100] })
    );
    await act(async () => {
      render(<FixedRange />);
    });
    expect(FixedLabel).toHaveBeenCalledTimes(4);
    expect(RangeBullet).toHaveBeenCalledTimes(4);
    expect(RangeLine).toHaveBeenCalledTimes(2);
  });
});
