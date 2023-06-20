import React from "react";
import { render, act, screen } from "@testing-library/react";
import NormalRange from "@components/range/normalRange";
import ErrorMessage from "@components/errorMessage";
import InputLabel from "@components/range/normalRange/inputLabel";
import RangeBullet from "@components/range/shared/rangeBullet";
import RangeLine from "@components/range/shared/rangeLine";
import getNormalSliderRange from "@services/getNormalSliderRange";
import "@testing-library/jest-dom";

jest.mock("components/errorMessage", () => {
  return jest.fn(() => (
    <div className="error-message" data-testid="error-message">
      Error Message Component
    </div>
  ));
});

jest.mock("components/range/normalRange/inputLabel", () => {
  return jest.fn(() => (
    <div className="inputLabel" data-testid="inputLabel">
      Input Label Component
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

jest.mock("services/getNormalSliderRange", () => {
  return jest.fn().mockResolvedValue({ min: 1, max: 100 });
});

describe("NormalRange", () => {
  beforeEach(() => {
    getNormalSliderRange.mockImplementation(() =>
      Promise.resolve({ min: 1, max: 100 })
    );
  });

  it("renders the component without error", async () => {
    await act(async () => {
      render(<NormalRange />);
    });
  });

  it("displays the error message when there is an error", async () => {
    getNormalSliderRange.mockImplementation(() =>
      Promise.resolve({ error: "Something went wrong" })
    );
    await act(async () => {
      render(<NormalRange />);
    });
    expect(ErrorMessage).toHaveBeenCalledTimes(1);
    expect(screen.queryByTestId("error-message")).toBeInTheDocument();
  });

  it("displays the all the subcomponents of NormalRange when rangeValues is correct", async () => {
    getNormalSliderRange.mockImplementation(() =>
      Promise.resolve({ min: 1, max: 100 })
    );
    await act(async () => {
      render(<NormalRange />);
    });
    expect(InputLabel).toHaveBeenCalledTimes(4);
    expect(RangeBullet).toHaveBeenCalledTimes(4);
    expect(RangeLine).toHaveBeenCalledTimes(2);
  });
});
