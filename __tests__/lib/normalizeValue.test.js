import normalizeValue from "@lib/normalizeValue";
import "@testing-library/jest-dom";

describe("normalizeValue", () => {
  // Tests that the function returns the correct normalized value when the min, max, and value are within the range.
  it("test_min_max_value_within_range", () => {
    expect(normalizeValue(0, 10, 5)).toBe(50);
  });

  // Tests that the function returns the correct normalized value when the value is outside the range of min and max.
  it("test_min_max_value_outside_range", () => {
    expect(normalizeValue(0, 10, 15)).toBe(150);
  });

  // Tests that the function returns 0 when min equals max.
  it("test_min_equals_max", () => {
    expect(normalizeValue(5, 5, 5)).toBe(0);
  });

  // Tests that the function returns 0 when min is greater than max.
  it("test_min_greater_than_max", () => {
    expect(normalizeValue(10, 0, 5)).toBe(0);
  });

  // Tests that the function returns the correct normalized value when given negative values.
  it("test_negative_values", () => {
    expect(normalizeValue(-10, 10, 0)).toBe(50);
    expect(normalizeValue(-10, 10, -5)).toBe(25);
    expect(normalizeValue(-20, 20, -15)).toBe(12.5);
  });

  // Tests that the function returns the correct normalized value when given decimal values.
  it("test_decimal_values", () => {
    expect(normalizeValue(0, 1, 0.5)).toBe(50);
    expect(normalizeValue(0, 1, 0.25)).toBe(25);
    expect(normalizeValue(0, 1, 1.5)).toBe(150);
  });
});
