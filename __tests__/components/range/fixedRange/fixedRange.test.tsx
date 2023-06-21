import React from "react";
import {
  render,
  act,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import FixedRange from "@components/range/fixedRange";
import getFixedSliderRange from "@services/getFixedSliderRange";
import "@testing-library/jest-dom";

jest.mock("services/getFixedSliderRange");
const rangeValues = [1.99, 5.99, 10.99, 30.99, 50.99, 70.99]; // Set the expected range values

describe("FixedRange", () => {
  it("It fetches the data from the API correctly and displays it in its min and max labels", async () => {
    (getFixedSliderRange as any).mockResolvedValueOnce({
      rangeValues,
    });
    await act(async () => {
      render(<FixedRange />);
    });
    const minText = screen.getByText("1.99 €");
    const maxText = screen.getByText("70.99 €");

    expect(minText).toBeInTheDocument();
    expect(maxText).toBeInTheDocument();
  });
  it("It the API returns an error it displays it correctly and no slider can be found", async () => {
    const errorText: string = "Error 500";
    (getFixedSliderRange as any).mockResolvedValueOnce({
      error: errorText,
    });
    await act(async () => {
      render(<FixedRange />);
    });
    const sliders = screen.queryAllByRole("slider");
    expect(sliders.length).toBe(0);
    const error = screen.getByText(errorText);
    expect(error).toBeInTheDocument();
  });

  it("The min bullet moves accordingly to the right when dragged by the mouse, never surpassing the max value", async () => {
    (getFixedSliderRange as any).mockResolvedValueOnce({
      rangeValues,
    });
    // Wait for the component to finish loading and update the state
    await act(async () => {
      render(<FixedRange />);
    });
    const minBullet = screen.getByRole("slider", { name: /bullet-min/i });

    // Simulate mousedown event on the element
    await fireEvent.mouseDown(minBullet);

    // Simulate mousemove event to the right, overpassing max limit
    fireEvent.mouseMove(minBullet, { clientX: 120 });

    // Simulate mouseup event to release the drag
    fireEvent.mouseUp(minBullet);
    waitFor(() =>
      expect(minBullet).toHaveStyle({
        left: `calc(${100}% - 0.5rem)`,
      })
    );
  });
  it("The min bullet moves accordingly to the right when dragged by the mouse, never surpassing the max value", async () => {
    (getFixedSliderRange as any).mockResolvedValueOnce({
      rangeValues,
    });
    // Wait for the component to finish loading and update the state
    await act(async () => {
      render(<FixedRange />);
    });
    const maxBullet = screen.getByRole("slider", { name: /bullet-max/i });

    // Simulate mousedown event on the element
    await fireEvent.mouseDown(maxBullet);

    // Simulate mousemove event to the right, overpassing max limit
    fireEvent.mouseMove(maxBullet, { clientX: -120 });

    // Simulate mouseup event to release the drag
    fireEvent.mouseUp(maxBullet);

    waitFor(() =>
      expect(maxBullet).toHaveStyle({
        left: `calc(${0}% - 0.5rem)`,
      })
    );
  });
});
