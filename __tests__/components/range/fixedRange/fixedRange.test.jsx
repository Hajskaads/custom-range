import React from "react";
import { render, screen, act } from "@testing-library/react";
import FixedRange from "@components/range/fixedRange";
import ErrorMessage from "@components/errorMessage";
import "@testing-library/jest-dom";

jest.mock("components/range/shared/skelleton", () => {
  return jest.fn(() => (
    <div className="loading-skelleton">Loading Skelleton Component</div>
  ));
});

jest.mock("components/errorMessage", () => {
  return jest.fn(() => (
    <div className="error-message">Error Message Component</div>
  ));
});

describe("FixedRange", () => {
  it("renders the component without error", async () => {
    await act(async () => {
      render(<FixedRange />);
    });
    // Assert that the component renders without throwing an error
  });

  // it("displays the loading skeleton when loading is true", async () => {
  //   await act(async () => {
  //     render(<FixedRange />);
  //   });
  //   const loadingSkeleton = screen.getByTestId("loading-skeleton");
  //   expect(loadingSkeleton).toBeInTheDocument();
  // });

  // it("displays the error message when there is an error", async () => {
  //   await act(async () => {
  //     render(<FixedRange />);
  //   });
  //   const errorMessage = screen.getByTestId("error-message");
  //   expect(ErrorMessage).toHaveBeenCalledTimes(1);
  // });

  // Add more test cases as needed
});
