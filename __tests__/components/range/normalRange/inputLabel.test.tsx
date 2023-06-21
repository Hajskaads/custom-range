import React from "react";
import { render, fireEvent } from "@testing-library/react";
import InputLabel from "@components/range/normalRange/inputLabel";
import "@testing-library/jest-dom";

describe("InputLabel", () => {
  it("should handle input change and call handleLabelChange", () => {
    const handleLabelChangeMock = jest.fn();
    const value = "10";
    const min = 0;
    const max = 100;
    const bullet = "max";

    const { getByLabelText } = render(
      <InputLabel
        value={value}
        min={min}
        max={max}
        bullet={bullet}
        handleLabelChange={handleLabelChangeMock}
      />
    );

    const input = getByLabelText(`Enter a ${bullet} slider number`);
    fireEvent.change(input, { target: { value: "20" } });

    expect(handleLabelChangeMock).toHaveBeenCalledWith("20", bullet, false);
  });

  it("should display an error message for invalid input", () => {
    const handleLabelChangeMock = jest.fn();
    const value = "10";
    const min = 0;
    const max = 100;
    const bullet = "max";

    const { getByLabelText, getByText } = render(
      <InputLabel
        value={value}
        min={min}
        max={max}
        bullet={bullet}
        handleLabelChange={handleLabelChangeMock}
      />
    );

    const input = getByLabelText(`Enter a ${bullet} slider number`);
    fireEvent.change(input, { target: { value: "abc" } });

    expect(handleLabelChangeMock).toHaveBeenCalledWith("", bullet, true);

    const errorMessage = getByText("Invalid input");
    expect(errorMessage).toBeInTheDocument();
  });

  it("should not update parent state when input out of range", () => {
    const handleLabelChangeMock = jest.fn();
    const value = "101";
    const min = 0;
    const max = 100;
    const bullet = "max";

    const { getByLabelText, getByText } = render(
      <InputLabel
        value={value}
        min={min}
        max={max}
        bullet={bullet}
        handleLabelChange={handleLabelChangeMock}
      />
    );

    const input = getByLabelText(`Enter a ${bullet} slider number`);
    fireEvent.change(input, { target: { value: "101" } });

    expect(handleLabelChangeMock).not.toHaveBeenCalledWith("101", bullet, true);
  });

  it("should not update parent state when input out of range", () => {
    const handleLabelChangeMock = jest.fn();
    const value = "9";
    const min = 10;
    const max = 70;
    const bullet = "max";

    const { getByLabelText, getByText } = render(
      <InputLabel
        value={value}
        min={min}
        max={max}
        bullet={bullet}
        handleLabelChange={handleLabelChangeMock}
      />
    );

    const input = getByLabelText(`Enter a ${bullet} slider number`);
    fireEvent.change(input, { target: { value: "9" } });

    expect(handleLabelChangeMock).not.toHaveBeenCalledWith("9", bullet, true);
  });

  it("should not update parent state when input out of range", () => {
    const handleLabelChangeMock = jest.fn();
    const value = "29";
    const min = 30;
    const max = 50;
    const bullet = "min";

    const { getByLabelText, getByText } = render(
      <InputLabel
        value={value}
        min={min}
        max={max}
        bullet={bullet}
        handleLabelChange={handleLabelChangeMock}
      />
    );

    const input = getByLabelText(`Enter a ${bullet} slider number`);
    fireEvent.change(input, { target: { value: "29" } });

    expect(handleLabelChangeMock).not.toHaveBeenCalledWith("29", bullet, true);
  });

  it("should not update parent state when input out of range", () => {
    const handleLabelChangeMock = jest.fn();
    const value = "71";
    const min = 0.99;
    const max = 70.99;
    const bullet = "max";

    const { getByLabelText, getByText } = render(
      <InputLabel
        value={value}
        min={min}
        max={max}
        bullet={bullet}
        handleLabelChange={handleLabelChangeMock}
      />
    );

    const input = getByLabelText(`Enter a ${bullet} slider number`);
    fireEvent.change(input, { target: { value: "9" } });

    expect(handleLabelChangeMock).not.toHaveBeenCalledWith("71", bullet, true);
  });
});
