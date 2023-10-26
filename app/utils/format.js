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
  return `\x1b[1;91m${msg}\x1b[0m`;
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
  return `\x1b[97m${msg}\x1b[0m`;
}

/**
 * Transforms the passed string into "WMATA Orange" colored text.
 * 
 * Pulled the hex code from the WMATA site by inspecting the
 * different colors on the site.
 * 
 * @param {string} msg
 *   String to transform.
 * 
 * @returns {string}
 *   Return the string in "WMATA Orange".
 */
export function wmataOrange(msg) {
  return `\x1b[1;38;2;237;139;0m${msg}\x1b[0m`;
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
  return `\x1b[1;38;2;0;156;222m${msg}\x1b[0m`;
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
  return `\x1b[1;38;2;191;13;62m${msg}\x1b[0m`
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
  return `\x1b[1;38;2;0;177;64m${msg}\x1b[0m`
}

/**
 * Transforms the passed string into "WMATA Silver" colored text.
 * 
 * Pulled the hex code from the WMATA site by inspecting the
 * different colors on the site.
 * 
 * @param {string} msg
 *   String to transform.
 * 
 * @returns {string}
 *   Return the string in "WMATA Silver".
 */
export function wmataSilver(msg) {
  return `\x1b[1;38;2;145;157;157m${msg}\x1b[0m`
}

export default {
  transformLine,
  error,
  bold,
  wmataOrange,
  wmataRed,
  wmataBlue,
  wmataGreen,
  wmataSilver
};
