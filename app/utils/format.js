import chalk from 'chalk';

export function error(msg) {
  return console.log(chalk`{red.bold ${msg}}`);
}

export function bold(msg) {
  return chalk`{white.bold ${msg}}`;
}

export function wmataBlue(msg) {
  return chalk`{bold.hex('#f00b47') ${msg}}`;
}

export function wmataRed(msg) {
  return chalk`{hex('#66ff66') ${msg}}`;
}

export function green(msg) {
  return chalk`{hex('#66ff66') ${msg}}`;
}

export default { error, bold, wmataRed, wmataBlue, green };
