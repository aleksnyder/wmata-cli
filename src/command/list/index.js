import axios from 'axios';
import { bold } from '../../utils/format';
import { basicTable } from '../../utils/table';

const vAlignCenter = columns =>
  columns.map(column => {
    if (typeof column === 'string') {
      return { content: column, vAlign: 'center', hAlign: 'center' };
    }

    return { ...column, vAlign: 'center' };
  });

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
  getStations(stationsUrl).then(data => {
    const abbrLine = transformLine(name);
    const heading = name.toUpperCase();

    const lineColor = data.filter(
      color =>
        color.LineCode4 === `${abbrLine}` ||
        color.LineCode3 === `${abbrLine}` ||
        color.LineCode2 === `${abbrLine}` ||
        color.LineCode1 === `${abbrLine}`
    );

    const stationsTable = basicTable();

    stationsTable.push([
      { colSpan: 36, content: `${heading} Line`, hAlign: 'center' },
    ]);
    stationsTable.push(
      vAlignCenter([
        {
          colSpan: 28,
          content: bold('Name'),
          hAlign: 'center',
        },
        {
          colSpan: 8,
          content: bold('Lines'),
          hAlign: 'center',
        },
      ])
    );

    Object.keys(lineColor).forEach(key => {
      const stationName = lineColor[key].Name;
      let lines = [];

      lines[0] = lineColor[key].LineCode1;
      lines[1] = lineColor[key].LineCode2;
      lines[2] = lineColor[key].LineCode3;
      lines[3] = lineColor[key].LineCode4;

      lines = lines.filter(line => line !== null).join();

      stationsTable.push(
        vAlignCenter([
          {
            colSpan: 28,
            content: `${stationName}`,
          },
          {
            colSpan: 8,
            content: `${lines}`,
            hAlign: 'center',
          },
        ])
      );
    });

    console.log(stationsTable.toString());
  });
}
