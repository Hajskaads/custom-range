/**
 * Checks if a value is a valid number.
 * @param {*} value - The value to be checked.
 * @returns {boolean} - Returns true if the value is a valid number, otherwise false.
 */
export default function isNumber(value: any) {
  return typeof value === "number" && !Number.isNaN(value);
}
