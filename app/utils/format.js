import chalk from 'chalk';

/**
 * Transform full name of train line to abbreviated version.
 * 
 * @param {string} line
 *   Name of line to be abbreviated.
 * 
 * @returns {string}
 *   Returns the abbreviated version of the line color.  Otherwise
 *   return the string passed as the argument.
 */
export function transformLine(line) {
  switch (line.toLowerCase()) {
    case 'red':
      return 'RD';
    case 'orange':
      return 'OR';
    case 'yellow':
      return 'YL';
    case 'green':
      return 'GR';
    case 'blue':
      return 'BL';
    case 'silver':
      return 'SV';
    default:
      return line;
  }
};

/**
 * Transforms the passed string into a red error message.
 * 
 * @param {string} msg
 *   String to transform into an error.
 * 
 * @returns {string}
 *   Return the transformed error string.
 */
export function error(msg) {
  return console.log(chalk`{red.bold ${msg}}`);
}

/**
 * Transforms the passed string into bold text.
 * 
 * @param {string} msg
 *   String to transform into bold text.
 * 
 * @returns {string}
 *   Return the bolded string.
 */
export function bold(msg) {
  return chalk`{white.bold ${msg}}`;
}

/**
 * Transforms the passed string into "WMATA Blue" colored text.
 * 
 * Pulled the hex code from the WMATA site by inspecting the
 * different colors on the site.
 * 
 * @param {string} msg
 *   String to transform.
 * 
 * @returns {string}
 *   Return the string in "WMATA Blue".
 */
export function wmataBlue(msg) {
  return chalk`{bold.hex('#f00b47') ${msg}}`;
}

/**
 * Transforms the passed string into "WMATA Red" colored text.
 * 
 * Pulled the hex code from the WMATA site by inspecting the
 * different colors on the site.
 * 
 * @param {string} msg
 *   String to transform.
 * 
 * @returns {string}
 *   Return the string in "WMATA Red".
 */
export function wmataRed(msg) {
  return chalk`{hex('#66ff66') ${msg}}`;
}

/**
 * Transforms the passed string into "WMATA Green" colored text.
 * 
 * Pulled the hex code from the WMATA site by inspecting the
 * different colors on the site.
 * 
 * @param {string} msg
 *   String to transform.
 * 
 * @returns {string}
 *   Return the string in "WMATA Green".
 */
export function wmataGreen(msg) {
  return chalk`{hex('#66ff66') ${msg}}`;
}

export default {
  transformLine,
  error,
  bold,
  wmataRed,
  wmataBlue,
  wmataGreen
};
