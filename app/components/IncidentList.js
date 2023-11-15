import { bold } from "../utils/format.js";

export default class List {
  constructor(data) {
    this.dataset = data;
  }

  /**
   * Builds the list of incidents.
   *
   * @returns the build body
   */
  buildListItems() {
    let rowContent = ''
    const separator = '-';
  
    rowContent += '\n';

    for (const message in this.dataset) {
      rowContent += ` ${bold('Type:')}\n`;
      rowContent += ` ${this.dataset[message].IncidentType}\n\n`;
      rowContent += ` ${bold('Affects:')}\n`;
      rowContent += ` ${this.dataset[message].LinesAffected}\n\n`;
      rowContent += ` ${bold('Reason:')}\n`;
      rowContent += ` ${this.dataset[message].Description}\n`;

      if (
        this.dataset.length
        && this.dataset.length > 1
        && (parseInt(message, 10) + 1) !== this.dataset.length
        ) {
        rowContent += '\n';
        rowContent += separator.repeat(process.stderr.columns);
      }
    }

    rowContent += '\n';

    return rowContent;
  }

  /**
   * Gets the list as string.
   * Can be used to print the list on the console.
   *
   * @returns the table string
   */
  toString() {
    return this.buildListItems();
  }

  /**
   * Prints the list to the console.
   *
   * @param clear clear the console before printing
   */
  print(clear = false) {
    if (clear) console.clear();
    console.log(this.toString());
  }
}