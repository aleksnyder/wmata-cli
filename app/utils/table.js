import Table from 'cli-table3';

/**
 * Vertically aligns the table cell text.
 * 
 * @param {object} columns
 *   Collection of table columns to vertically center.
 * 
 * @returns {object}
 *   Return columns object with vertically centered text.
 */
const vAlignCenter = (/** @type {any[]} */ columns) =>
  columns.map(column => {
    if (typeof column === 'string') {
      return { content: column, vAlign: 'center', hAlign: 'center' };
    }

    return { ...column, vAlign: 'center' };
  });

/**
 * Basic table structure to be shared across all command outputs.
 */
const basicTable = (settings = []) =>
  new Table({
    head: [],
    chars: {
      top: '═',
      'top-mid': '╤',
      'top-left': '╔',
      'top-right': '╗',
      bottom: '═',
      'bottom-mid': '╧',
      'bottom-left': '╚',
      'bottom-right': '╝',
      left: '║',
      'left-mid': '╟',
      mid: '─',
      'mid-mid': '┼',
      right: '║',
      'right-mid': '╢',
      middle: '│',
    },
    ...settings
  });

export {
  basicTable,
  vAlignCenter
};
