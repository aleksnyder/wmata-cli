import { isNumber } from "../utils/helpers.js";

export default class Table {
  /**
   * The table width.
   */
  tableWidth = 0;

  /**
   * The column names.
   * Including the dynamic and origin column names
   */
  columnNames = [];

  /**
   * The padding around cell data or "cellpadding"
   */
  paddingSize = 2;

  /**
   * The character to use for padding
   */
  paddingChar = ' ';

  constructor(data) {
    this.dataset = data;
    this.build();
  }

  /**
   * Gets the value of the given cell in the dataset.
   *
   * @param row the cell's row
   * @param col the cell's col
   * @returns the cell's value
   */
  getDataCell(row, col) {
    return this.dataset[row][col];
  }

  /**
   * Gets the character padding of the given `size`.
   *
   * @param size the padding size
   * @returns the character padding
   */
  getPadding(size) {
    return this.paddingChar.repeat(size);
  }

  /**
   * Get the width of the console window.
   * Padding is substracted from the width.
   *
   * @returns the console width
   */
  getConsoleWidth() {
    const numberOfCols = this.columnNames.length;
    return process.stderr.columns - numberOfCols * 2 * this.paddingSize;
  }

  /**
   * Gets the display name of the given column.
   *
   * @param col the column
   * @param cropped whether the column name should be cropped or not.
   * @returns the column's display name `string`
   */
  getColumnDisplayName(col, cropped) {
    let name = col.toString();

    if (cropped) name = name.substring(0, this.getColumnWidth(col));

    return name;
  }

   /**
   * Gets the width of the given column.
   *
   * @param col the column
   * @returns the column's text width
   */
   getColumnWidth(col) {
    return this.columnWidths.get(col);
  }

  /**
   * Builds a cell content array.
   *
   * @param padLeft the cell's left padding
   * @param text the cell's text
   * @param padRight the cell's right padding
   * @returns the cell content
   */
  buildCellContent(padLeft, text, padRight) {
    return [this.getPadding(padLeft), text, this.getPadding(padRight)];
  }

  /**
   * Builds an empty cell content.
   *
   * @param col the cell's column
   * @returns the empty cell content
   */
  buildEmptyCellContent(col) {
    return this.buildCellContent(
      this.paddingSize,
      this.getPadding(this.getColumnWidth(col)),
      this.paddingSize
    );
  }

  /**
   * Parses the given cell text to `String`.
   *
   * @param text the text to parse
   * @returns the parsed cell text
   */
  parseCellText(text) {
    if (isNumber(text) && !Number.isInteger(text)) return text.toFixed(3);
    return text.toString();
  }

  /**
   * Calculates the width of all columns.
   * The result is stored in {@link Table.columnWidths}
   */
  calculateColumnWidths() {
    const widths = new Map;
    const data = this.dataset.slice();
    const colNames = this.columnNames;

    const maxWidth = Number.MAX_SAFE_INTEGER;

    // Initalize with maxWidth / column text length
    for (const name of colNames) {
      widths.set(name, Math.min(this.getColumnDisplayName(name).length, maxWidth));
    }

    // Search longest string / value
    for (const col of colNames) {
      for (let iRow = 0; iRow < data.length; iRow++) {
        const text = this.getDataCell(iRow, col);
        const textLen = Math.min(this.parseCellText(text).length, maxWidth);
        widths.set(col, Math.max(widths.get(col), textLen));
      }
    }

    this.columnWidths = widths;
  }

  /**
   * Builds the row separator.
   *
   * @param separator the separator character
   * @returns the row separator string
   */
  buildRowSeparator(separator) {
    const terminalWidth = this.tableWidth < process.stderr.columns ? this.tableWidth : process.stderr.columns;
    return separator.repeat(terminalWidth);
  }

   /**
   * Builds the subsequent lines (overflow) of the given row.
   * Set `row=0` for the header.
   *
   * @param row the initial row
   * @param overflow the text overflow for each solumn
   * @returns the subsequent lines
   */
   buildRowOverflow(row, overflow) {
    let content = '\n';

    // A overflowed row might have overflow as well (makes sense, right?)
    let hasOverflow = false;

    for (let i = 0; i < overflow.length; i++) {
      const colName = this.columnNames[i];
      const colWidth = this.getColumnWidth(colName);
      const text = overflow[i].substring(0, colWidth);

      if (!text.length) {
        content += buildEmptyCellContent(colName);
      } else {
        const cellContentLeft = this.buildCellContent(
          this.paddingSize,
          text,
          colWidth - text.length + this.paddingSize
        );
  
        content += cellContentLeft;
      }

       // Cut overflow and check if there's more left
       overflow[i] = overflow[i].substring(colWidth);
       if (overflow[i].length) hasOverflow = true;
    }

    if (hasOverflow) content += this.buildRowOverflow(row, overflow);

    return content;
  }

  /**
   * Builds the column names from the dataset in the right order.
   * The result is stored in {@link Table.columnNames}.
   *
   * All column names are converted to `string` in order to avoid
   * complications when using arrays and numbers and indices.
   */
  buildColumnNames() {
    if (!this.dataset.length) return;

    const names = new Set;

    Object.keys(this.dataset[0]).forEach((col) => {
      names.add(col);
    });

    this.columnNames = Array.from(names);
  }

  /**
   * Calculates the header cell padding.
   * The padding is based on the column's width and its display name.
   *
   * @param col the cell's column
   * @returns the cell padding
   */
  calculateHeaderCellPadding(col) {
    return this.getColumnWidth(col) - this.getColumnDisplayName(col, true).length + this.paddingSize;
  }

  /**
   * Calculates the body cell padding.
   *
   * @param row the cell's row
   * @param col the cell's column
   * @returns the cell padding
   */
  calculateBodyCellPadding(row, col) {
    return this.getColumnWidth(col) - this.getCellText(row, col).length + this.paddingSize;
  }

  /**
   * Builds the given header cell content.
   *
   * @param col the cell's column
   * @returns the built cell content
   */
  buildHeaderCell(col) {
    let content;
    const displayName = this.getColumnDisplayName(col, true);
    const overflow = this.getColumnDisplayName(col).substring(this.getColumnWidth(col)).trim();

    const paddingR = this.calculateHeaderCellPadding(col);
    content = this.buildCellContent(this.paddingSize, displayName, paddingR);

    return [content, overflow];
  }

  /**
   * Builds the header.
   *
   * @returns the built header
   */
  buildHeader() {
    let rowContent = '';
    let hasOverflow = false;

    // Overflowed text that did not fit in 1 single row
    const txtOverflow = [];

    for (const col of this.columnNames) {
      const [cell, overflow] = this.buildHeaderCell(col);
      rowContent += cell.toString().replace(/,/g, '');

      txtOverflow.push(overflow);
      if (overflow.length) hasOverflow = true;
    }

    if (hasOverflow) rowContent += this.buildRowOverflow(0, txtOverflow);

    rowContent += '\n' + this.buildRowSeparator('=');

    return rowContent;
  }

  /**
   * Gets the text of given the given cell.
   *
   * @param row the cell's row
   * @param col the cell's column
   * @param cropped whether the text should be cropped or not.
   * @returns the cell text
   */
  getCellText(row, col, cropped = true) {
    let text = '';

    text = this.parseCellText(this.getDataCell(row, col));

    text = text.trim();

    if (cropped) text = text.substring(0, this.getColumnWidth(col));

    return text;
  }

   /**
   * Builds the given body cell content.
   *
   * @param row the cell's row
   * @param col the cell's column
   * @returns the built cell content
   */
   buildBodyCell(row, col) {
    let content;

    const cellText = this.getCellText(row, col);
    const overflow = this.getCellText(row, col, false).substring(this.getColumnWidth(col)).trim();
    console.log(this.getCellText(row, col, false).length)

    const paddingR = this.calculateBodyCellPadding(row, col);
    content = this.buildCellContent(this.paddingSize, cellText, paddingR);

    return [content, overflow];
  }

  /**
   * Builds the given body row.
   *
   * @param row the row
   * @returns the built row content
   */
  buildBodyRow(row) {
    let rowContent = '';
    let hasOverflow = false;

    // Overflowed text that did not fit in 1 single row
    const txtOverflow = [];

    for (const col of this.columnNames) {
      const [cell, overflow] = this.buildBodyCell(row, col);
      rowContent += cell;
      txtOverflow.push(overflow);
      if (overflow.length) hasOverflow = true;
    }

    if (hasOverflow) rowContent += this.buildRowOverflow(row, txtOverflow);

    return rowContent;
  }

  /**
   * Builds the body.
   *
   * @returns the build body
   */
  buildBody() {
    let rows = [];

    rows = this.dataset.map((_, i) => this.buildBodyRow(i));

    return rows.filter((row) => row.length).join('\n').replace(/,/g, '');
  }

  /**
   * Calculates the width of the complete table.
   * The table width is based on the width of the columns, the padding and the border.
   *
   * @returns the table width
   */
  calculateTableWidth() {
    const numberOfCols = this.columnNames.length;

    const borderLen = 0;

    return (
      Array.from(this.columnWidths.values()).reduce((prev, val) => prev + val, 0) +
      numberOfCols * this.paddingSize * 2 +
      borderLen
    );
  }

  /**
   * Gets the table as string.
   * Can be used to print the table on the console.
   *
   * @returns the table string
   */
  toString() {
    this.build();
    return [this.buildHeader(), this.buildBody()].join('\n');
  }

  /**
   * Prints the table to the console.
   *
   * @param clear clear the console before printing
   */
  print(clear = false) {
    if (clear) console.clear();
    console.log(this.toString());
  }

  /**
   * Builds the table.
   * For performance reasons the table is only built if {@link Table.touched} is `true`.
   *
   * @param force force the build
   */
  build() {
    this.buildColumnNames();
    this.calculateColumnWidths();
    this.tableWidth = this.calculateTableWidth();
  }
}