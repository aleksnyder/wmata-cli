import chalk from 'chalk';

const error = msg => {
  console.log(chalk`{red.bold ${msg}}`);
};

const bold = msg => chalk`{white.bold ${msg}}`;

const wmataBlue = msg => chalk`{bold.hex('#f00b47') ${msg}}`;

const wmataRed = msg => chalk`{hex('#66ff66') ${msg}}`;

const green = msg => chalk`{hex('#66ff66') ${msg}}`;

export { error, bold, wmataRed, wmataBlue, green };
