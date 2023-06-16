/**
 * Finds the value in the given array that is closest to the target number.
 * If the target number is exactly between two values, it returns the highest or lowest value based on the isMax flag.
 *
 * @param {number[]} numbers - Array of numbers to search.
 * @param {number} target - Target number.
 * @param {boolean} isMax - Flag indicating whether to return the highest or lowest value when equidistant.
 * @returns {number} - The value in the array that is closest to the target number.
 */
export default function findClosestValue(
  target: number,
  numbers: number[],
  isMax: boolean
): number {
  let closestValue = numbers[0];

  // Iterate over the numbers array
  for (let i = 1; i < numbers.length; i++) {
    const currentNumber = numbers[i];

    // Check if the absolute difference between the current number and target is smaller than the closest difference so far
    if (Math.abs(currentNumber - target) < Math.abs(closestValue - target)) {
      closestValue = currentNumber;
    } else if (
      Math.abs(currentNumber - target) === Math.abs(closestValue - target)
    ) {
      // Check if the numbers are equidistant from the target
      if (isMax) {
        closestValue = Math.max(currentNumber, closestValue);
      } else {
        closestValue = Math.min(currentNumber, closestValue);
      }
    }
  }

  return closestValue;
}
