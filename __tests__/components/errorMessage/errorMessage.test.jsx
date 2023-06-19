import React from "react";
import { render } from "@testing-library/react";
import ErrorMessage from "@components/errorMessage";
import "@testing-library/jest-dom";

describe("ErrorMessage", () => {
  it("renders the error message correctly", () => {
    const errorMessage = "Test error message";
    const { getByText } = render(<ErrorMessage errorMessage={errorMessage} />);
    const errorMessageElement = getByText(errorMessage);
    expect(errorMessageElement).toBeInTheDocument();
  });

  it("renders the default error message when no errorMessage prop is provided", () => {
    const defaultErrorMessage = "Something went wrong";
    const { getByText } = render(<ErrorMessage />);
    const defaultErrorMessageElement = getByText(defaultErrorMessage);
    expect(defaultErrorMessageElement).toBeInTheDocument();
  });
});
