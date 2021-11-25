import axios from 'axios';
import { bold } from '../../utils/format.js';
import { basicTable } from '../../utils/table.js';

const vAlignCenter = columns =>
  columns.map(column => {
    if (typeof column === 'string') {
      return { content: column, vAlign: 'center', hAlign: 'center' };
    }

    return { ...column, vAlign: 'center' };
  });

const trainsUrl =
  'https://api.wmata.com/StationPrediction.svc/json/GetPrediction/All?api_key=f640f6ee5156453b864f6582f585dd73';

const getTrains = async url => {
  try {
    const response = await axios.get(url);
    return response.data.Trains;
  } catch (error) {
    console.log(error);
  }
};

export default function(name) {
  getTrains(trainsUrl).then(data => {
    const heading = name.toUpperCase();

    const stationName = data.filter(color => color.LocationName === `${name}`);

    const trainTable = basicTable();

    trainTable.push([{ colSpan: 32, content: `${heading}`, hAlign: 'center' }]);
    trainTable.push(
      vAlignCenter([
        {
          colSpan: 20,
          content: bold('Destination'),
        },
        {
          colSpan: 6,
          content: bold('Line'),
          hAlign: 'center',
        },
        {
          colSpan: 6,
          content: bold('ETA'),
          hAlign: 'center',
        },
      ])
    );

    Object.keys(stationName).forEach(key => {
      const line = stationName[key].Line;
      const eta = stationName[key].Min;
      const destination = stationName[key].DestinationName;

      trainTable.push(
        vAlignCenter([
          {
            colSpan: 20,
            content: `${destination}`,
          },
          {
            colSpan: 6,
            content: `${line}`,
            hAlign: 'center',
          },
          {
            colSpan: 6,
            content: `${eta}`,
            hAlign: 'center',
          },
        ])
      );
    });

    console.log(trainTable.toString());
  });
}
