/**
 * Checks data type of the passed variable to see if it's an integer.
 * 
 * @param {string} value
 *   Value to verify data type
 * 
 * @returns {boolean}
 *   Returns true if variable type is a number
 */
export function isNumber(value) {
  return typeof value === "number"
}