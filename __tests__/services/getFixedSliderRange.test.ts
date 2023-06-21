import getFixedSliderRange from "@services/getFixedSliderRange";
import "@testing-library/jest-dom";

describe("getFixedSliderRange", () => {
  // Tests that a valid response with rangeValues array is returned when fetch is successful and response is valid
  it("test_valid_response", async () => {
    const mockResponse = {
      status: 200,
      json: jest.fn().mockResolvedValue({ rangeValues: [1, 2, 3] }),
    };
    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    const result = await getFixedSliderRange();

    expect(result).toEqual({ rangeValues: [1, 2, 3] });
  });

  // Tests that an error response with error message is returned when fetch is successful but response is invalid
  it("test_invalid_response", async () => {
    const mockResponse = {
      status: 200,
      json: jest.fn().mockResolvedValue({ error: "Invalid response" }),
    };

    jest.spyOn(global, "fetch").mockResolvedValue(mockResponse as any);

    const result = await getFixedSliderRange();

    expect(result).toEqual({ error: "Invalid response" });
  });

  // Tests that an error response with default error message is returned when fetch fails
  it("test_fetch_failure", async () => {
    jest.spyOn(global, "fetch").mockRejectedValue(new Error("Fetch failed"));

    const result = await getFixedSliderRange();

    expect(result).toEqual({ error: "Something went wrong" });
  });

  // Tests that an error response with default error message is returned when rangeValues is not an array
  it("test_non_array_rangeValues", async () => {
    const mockResponse = {
      status: 200,
      json: jest.fn().mockResolvedValue({ rangeValues: "not an array" }),
    };

    jest.spyOn(global, "fetch").mockResolvedValue(mockResponse as any);

    const result = await getFixedSliderRange();

    expect(result).toEqual({ error: "Something went wrong" });
  });

  // Tests that an error response with default error message is returned when rangeValues is an empty array
  it("test_empty_rangeValues", async () => {
    const mockResponse = {
      status: 200,
      json: jest.fn().mockResolvedValue({ rangeValues: [] }),
    };

    jest.spyOn(global, "fetch").mockResolvedValue(mockResponse as any);

    const result = await getFixedSliderRange();

    expect(result).toEqual({ error: "Something went wrong" });
  });

  // Tests that an error response with default error message is returned when rangeValues contains non-number items
  it("test_non_number_items_in_rangeValues", async () => {
    const mockResponse = {
      status: 200,
      json: jest.fn().mockResolvedValue({ rangeValues: [1, "2", 3] }),
    };

    jest.spyOn(global, "fetch").mockResolvedValue(mockResponse as any);

    const result = await getFixedSliderRange();

    expect(result).toEqual({ error: "Something went wrong" });
  });
});
