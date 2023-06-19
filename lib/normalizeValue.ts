/**
 * Normalizes a given number within a specified range.
 * @param min - The minimum value of the range.
 * @param max - The maximum value of the range.
 * @param value - The number to be normalized.
 * @returns The normalized value from 0 to 100.
 */
export default function normalizeValue(
  min: number,
  max: number,
  value: number
): number {
  if (min === max || min > max || max < min) {
    return 0;
  }
  const range = max - min; // Calculate the range of the values
  const normalized = ((value - min) / range) * 100; // Normalize the value within the range and convert to a 0-100 scale
  return normalized; // Return the normalized value
}
