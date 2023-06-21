import React from "react";
import { render, act, screen, fireEvent } from "@testing-library/react";
import NormalRange from "@components/range/normalRange";
import getNormalSliderRange from "@services/getNormalSliderRange";
import "@testing-library/jest-dom";

jest.mock("services/getNormalSliderRange");
const mockMin = 10; // Set the expected value for min
const mockMax = 70; // Set the expected value for max

describe("NormalRange", () => {
  it("It fetches the data from the API correctly and displays it in its min and max labels", async () => {
    // @ts-ignore
    getNormalSliderRange.mockResolvedValueOnce({
      min: mockMin,
      max: mockMax,
    });
    await act(async () => {
      render(<NormalRange />);
    });
    const minLabel = screen.getByLabelText("Enter a min slider number");
    const maxLabel = screen.getByLabelText("Enter a max slider number");

    expect(minLabel).toHaveValue(mockMin);
    expect(maxLabel).toHaveValue(mockMax);
  });

  it("It the API returns an error it displays it correctly and no slider can be found", async () => {
    const errorText: string = "Error 500";
    // @ts-ignore
    getNormalSliderRange.mockResolvedValueOnce({
      error: errorText,
    });
    await act(async () => {
      render(<NormalRange />);
    });
    const sliders = screen.queryAllByRole("slider");
    expect(sliders.length).toBe(0);
    const error = screen.getByText(errorText);
    expect(error).toBeInTheDocument();
  });

  it("The min bullet moves accordingly to the right when dragged by the mouse, never surpassing the max value", async () => {
    // @ts-ignore
    getNormalSliderRange.mockResolvedValueOnce({
      min: mockMin,
      max: mockMax,
    });
    // Wait for the component to finish loading and update the state
    await act(async () => {
      render(<NormalRange />);
    });
    const minBullet = screen.getByRole("slider", { name: /bullet-min/i });

    // Simulate mousedown event on the element
    fireEvent.mouseDown(minBullet);

    // Simulate mousemove event to the right, overpassing max limit
    fireEvent.mouseMove(minBullet, { clientX: 120 });

    // Simulate mouseup event to release the drag
    fireEvent.mouseUp(minBullet);

    expect(minBullet).toHaveStyle({
      left: `calc(${100}% - 0.5rem)`,
    });
  });

  it("The max bullet moves accordingly to the left when dragged by the mouse, never surpassing the min value", async () => {
    // @ts-ignore
    getNormalSliderRange.mockResolvedValueOnce({
      min: mockMin,
      max: mockMax,
    });
    // Wait for the component to finish loading and update the state
    await act(async () => {
      render(<NormalRange />);
    });
    const maxBullet = screen.getByRole("slider", { name: /bullet-max/i });

    // Simulate mousedown event on the element
    fireEvent.mouseDown(maxBullet);

    // Simulate mousemove event to the right, overpassing max limit
    fireEvent.mouseMove(maxBullet, { clientX: -120 });

    // Simulate mouseup event to release the drag
    fireEvent.mouseUp(maxBullet);

    expect(maxBullet).toHaveStyle({
      left: `calc(${0}% - 0.5rem)`,
    });
  });
});
