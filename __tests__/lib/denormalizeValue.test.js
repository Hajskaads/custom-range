import denormalizeValue from "@lib/denormalizeValue";
import "@testing-library/jest-dom";

describe("denormalizeValue", () => {
  // Tests that the function returns the correct denormalized value for valid input values
  it("test_min_max_percentage", () => {
    expect(denormalizeValue(0, 100, 50)).toBe(50);
    expect(denormalizeValue(-10, 10, 25)).toBe(-5);
    expect(denormalizeValue(10, 20, 75)).toBe(17.5);
  });

  // Tests that the function returns the correct denormalized value when min equals max
  it("test_min_equals_max", () => {
    expect(denormalizeValue(0, 0, 50)).toBe(0);
    expect(denormalizeValue(-10, -10, 25)).toBe(-10);
    expect(denormalizeValue(10, 10, 75)).toBe(10);
  });

  // Tests that the function returns the correct denormalized value when percentage is zero
  it("test_percentage_zero", () => {
    expect(denormalizeValue(0, 100, 0)).toBe(0);
    expect(denormalizeValue(-10, 10, 0)).toBe(-10);
    expect(denormalizeValue(10, 20, 0)).toBe(10);
  });

  // Tests that the function returns the correct denormalized value when percentage is one hundred
  it("test_percentage_hundred", () => {
    expect(denormalizeValue(0, 100, 100)).toBe(100);
    expect(denormalizeValue(-10, 10, 100)).toBe(10);
    expect(denormalizeValue(10, 20, 100)).toBe(20);
  });

  // Tests that the function returns the correct denormalized value when min and max are negative
  it("test_negative_min_max", () => {
    expect(denormalizeValue(-100, -50, 50)).toBe(-75);
    expect(denormalizeValue(-10, -5, 25)).toBe(-8.75);
    expect(denormalizeValue(-20, -10, 75)).toBe(-12.5);
  });

  // Tests that the function returns the correct denormalized value when percentage is greater than one hundred
  it("test_percentage_greater_than_hundred", () => {
    expect(denormalizeValue(0, 100, 150)).toBe(150);
    expect(denormalizeValue(-10, 10, 200)).toBe(30);
    expect(denormalizeValue(10, 20, 125)).toBe(22.5);
  });
});
