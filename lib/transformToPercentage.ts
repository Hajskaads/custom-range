/**
 * Transforms a given number from an array to a percentage based on the minimum and maximum values of the array.
 * @param {number} number - The input number to be transformed.
 * @param {number[]} array - The array of numbers.
 * @returns {number} - The percentage value corresponding to the input number.
 */
export default function transformToPercentage(number: number, array: number[]) {
  const minValue = Math.min(...array);
  const maxValue = Math.max(...array);

  const percentage = ((number - minValue) / (maxValue - minValue)) * 100;
  return percentage;
}
