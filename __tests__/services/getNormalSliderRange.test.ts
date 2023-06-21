import getNormalSliderRange from "@services/getNormalSliderRange";
import "@testing-library/jest-dom";

describe("getNormalSliderRange", () => {
  // Tests that the function returns an object with min and max values when response status is 200 and min and max are numbers and max is greater than or equal to min
  it("test_normal_range_api_returns_min_and_max_values", async () => {
    const mockResponse = {
      status: 200,
      json: jest.fn().mockResolvedValue({ min: 1, max: 10 }),
    };
    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    const result = await getNormalSliderRange();

    expect(result).toEqual({ min: 1, max: 10 });
  });

  // Tests that the function returns an error response object when response status is not 200
  it("test_edge_case_returns_error_response_object_when_response_status_is_not_200", async () => {
    const mockResponse = {
      status: 404,
      json: jest.fn().mockResolvedValue({ error: "Not found" }),
    };

    jest.spyOn(window, "fetch").mockResolvedValue(mockResponse);

    const result = await getNormalSliderRange();

    expect(result).toEqual({ error: "Not found" });
  });

  // Tests that the function returns an error response object when min or max is not a number
  it("test_edge_case_returns_error_response_object_when_min_or_max_is_not_a_number", async () => {
    const mockResponse = {
      status: 200,
      json: jest.fn().mockResolvedValue({ min: "1", max: "10" }),
    };

    jest.spyOn(window, "fetch").mockResolvedValue(mockResponse);

    const result = await getNormalSliderRange();

    expect(result).toEqual({ error: "Something went wrong" });
  });

  // Tests that the function returns an error response object when max is less than min
  it("test_edge_case_returns_error_response_object_when_max_is_less_than_min", async () => {
    const mockResponse = {
      status: 200,
      json: jest.fn().mockResolvedValue({ min: 10, max: 1 }),
    };

    jest.spyOn(window, "fetch").mockResolvedValue(mockResponse);

    const result = await getNormalSliderRange();

    expect(result).toEqual({ error: "Something went wrong" });
  });

  // Tests that the function returns an error response object with custom error message when error is present in response
  it("test_general_behaviour_returns_error_response_object_with_custom_error_message_when_error_is_present_in_response", async () => {
    const mockResponse = {
      status: 200,
      json: jest.fn().mockResolvedValue({ error: "Custom error message" }),
    };

    jest.spyOn(window, "fetch").mockResolvedValue(mockResponse);

    const result = await getNormalSliderRange();

    expect(result).toEqual({ error: "Custom error message" });
  });

  // Tests that the function returns an error response object with default error message when an error occurs during fetch
  it("test_general_behaviour_returns_error_response_object_with_default_error_message_when_an_error_occurs_during_fetch", async () => {
    jest.spyOn(window, "fetch").mockRejectedValue(new Error("Network error"));

    const result = await getNormalSliderRange();

    expect(result).toEqual({ error: "Something went wrong" });
  });
});
