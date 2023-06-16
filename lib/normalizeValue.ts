/**
 * Normalizes a given number within a specified range.
 * @param min - The minimum value of the range.
 * @param max - The maximum value of the range.
 * @param normalizedValue - The normalized value from 0 to 100.
 * @returns The number normalized from min to max.
 */
export default function normalizeValue(
  min: number,
  max: number,
  percentage: number
): number {
  const range = max - min; // Calculate the range of the values
  const normalized = (percentage / 100) * range + min; // Denormalize the value within the range
  return normalized; // Return the normalized value
}
