/**
 * Transforms an array of numbers to a percentage scale based on the minimum and maximum values.
 * @param {number[]} array - The array of numbers.
 * @returns {number[]} - The array of numbers transformed to a percentage scale.
 */
export default function transformArrayToPercentage(array: number[]) {
  // Find the minimum and maximum values in the array
  const minValue = Math.min(...array);
  const maxValue = Math.max(...array);

  // Calculate the percentage for each number in the array
  const percentageArray = array.map((number) => {
    return ((number - minValue) / (maxValue - minValue)) * 100;
  });

  // Return the array of numbers transformed to a percentage scale
  return percentageArray;
}
