import inquirer from 'inquirer';
import Command from './command.js';
import station from './stations.js';
import { transformLine } from '../utils/format.js';
import { apiKey } from '../utils/constants.js';

const stationsUrl =
  `https://api.wmata.com/Rail.svc/json/jStations?contentType=json&api_key=${apiKey}`;

const stations = new Command(stationsUrl, 'Stations');

export default function(name) {
  stations.getResults()
    .then(async data => {
      const abbrLine = transformLine(name);
      const stationList = [];

      const lineColor = data.filter(
        color =>
          color.LineCode4 === `${abbrLine}` ||
          color.LineCode3 === `${abbrLine}` ||
          color.LineCode2 === `${abbrLine}` ||
          color.LineCode1 === `${abbrLine}`
      );

      Object.keys(lineColor).forEach((key, index) => {
        stationList[index] = lineColor[key].Name;
      });

      const answer = await inquirer
        .prompt([
          {
            type: 'list',
            name: 'stations',
            message: 'Select a station:',
            choices: stationList,
            default: [],
          },
        ]);
      station(answer.stations);
    })
    .catch(error => {
      console.log(error);
    });
}
