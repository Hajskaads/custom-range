import isNumber from "@lib/isNumber";
import "@testing-library/jest-dom";

describe("isNumber", () => {
  // Tests that a positive integer is a valid number
  it("test_positive_integer", () => {
    expect(isNumber(42)).toBe(true);
  });

  // Tests that a negative integer is a valid number
  it("test_negative_integer", () => {
    expect(isNumber(-42)).toBe(true);
  });

  // Tests that a floating point number is a valid number
  it("test_floating_point_number", () => {
    expect(isNumber(3.14)).toBe(true);
  });

  // Tests that zero is a valid number
  it("test_zero", () => {
    expect(isNumber(0)).toBe(true);
  });

  // Tests that NaN is not a valid number
  it("test_NaN", () => {
    expect(isNumber(NaN)).toBe(false);
  });

  // Tests that Infinity is not a valid number
  it("test_Infinity", () => {
    expect(isNumber(Infinity)).toBe(false);
  });
});
