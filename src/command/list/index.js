import axios from 'axios';
import inquirer from 'inquirer';
import cli from '../../command/index.js';

const stationsUrl =
  'https://api.wmata.com/Rail.svc/json/jStations?contentType=json&api_key=f640f6ee5156453b864f6582f585dd73';

const getStations = async url => {
  try {
    const response = await axios.get(url);
    return response.data.Stations;
  } catch (error) {
    console.log(error);
  }
};

const transformLine = line => {
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

export default function(name) {
  getStations(stationsUrl)
    .then(data => {
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

      return inquirer
        .prompt([
          {
            type: 'list',
            name: 'stations',
            message: 'Select a station:',
            choices: stationList,
            default: [],
          },
        ])
        .then(answer => {
          cli.station(answer.stations);
        });
    })
    .catch(error => {
      console.log(error);
    });
}
