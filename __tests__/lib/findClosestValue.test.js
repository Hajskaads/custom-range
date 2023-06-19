import findClosestValue from "@lib/findClosestValue";
import "@testing-library/jest-dom";

describe("findClosestValue", () => {
  // Tests that the function returns the closest value to the target in a simple array of numbers
  it("returns the closest value to the target in a simple array of numbers", () => {
    const numbers = [1, 3, 5, 7, 9];
    const target = 1.5;
    const isMax = false;
    const expected = 1;
    const result = findClosestValue(target, numbers, isMax);
    expect(result).toEqual(expected);
  });

  // Tests that the function returns the highest value when isMax is true and the target is exactly between two values
  it("returns the highest value when isMax is true and the target is exactly between two values", () => {
    const numbers = [1, 3, 5, 7, 9];
    const target = 6;
    const isMax = true;
    const expected = 7;
    const result = findClosestValue(target, numbers, isMax);
    expect(result).toEqual(expected);
  });

  // Tests that the function returns the lowest value when isMax is false and the target is exactly between two values
  it("returns the lowest value when isMax is false and the target is exactly between two values", () => {
    const numbers = [1, 3, 5, 7, 9];
    const target = 6;
    const isMax = false;
    const expected = 5;
    const result = findClosestValue(target, numbers, isMax);
    expect(result).toEqual(expected);
  });

  // Tests that the function returns the only value in the array when the array has only one value
  it("returns the only value in the array when the array has only one value", () => {
    const numbers = [5];
    const target = 6;
    const isMax = true;
    const expected = 5;
    const result = findClosestValue(target, numbers, isMax);
    expect(result).toEqual(expected);
  });
});
