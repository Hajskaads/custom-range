import React from "react";
import { render, act, screen, fireEvent } from "@testing-library/react";
import NormalRange from "@components/range/normalRange";
import getNormalSliderRange from "@services/getNormalSliderRange";
import "@testing-library/jest-dom";

jest.mock("services/getNormalSliderRange");
const mockMin = 10; // Set the expected value for min
const mockMax = 70; // Set the expected value for max

describe("NormalRange", () => {
  it("The min bullet moves accordingly to the right when dragged by the mouse, never surpassing the max value", async () => {
    // @ts-ignore
    getNormalSliderRange.mockResolvedValueOnce({
      min: mockMin,
      max: mockMax,
    });
    // Wait for the component to finish loading and update the state
    const promise = Promise.resolve({ data: { min: 10, max: 70 } });
    await act(async () => {
      jest.mock("services/getNormalSliderRange", () => promise);
      render(<NormalRange />);
    });
    const minBullet = screen.getByRole("slider", { name: /bullet-min/i });

    // Simulate mousedown event on the element
    fireEvent.mouseDown(minBullet);

    // Simulate mousemove event to the right, overpassing max limit
    fireEvent.mouseMove(minBullet, { clientX: 120 });

    // Simulate mouseup event to release the drag
    fireEvent.mouseUp(minBullet);

    const maxBullet = screen.getByRole("slider", { name: /bullet-max/i });

    expect(maxBullet).toHaveStyle({
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
    const promise = Promise.resolve({ data: { min: 10, max: 70 } });
    await act(async () => {
      jest.mock("services/getNormalSliderRange", () => promise);
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

    screen.debug();
  });
});
