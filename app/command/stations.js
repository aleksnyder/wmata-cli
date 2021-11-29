import Command from './command.js';
import { bold } from '../utils/format.js';
import { basicTable, vAlignCenter } from '../utils/table.js';
import { apiKey } from '../utils/constants.js';

const trainsUrl =
  `https://api.wmata.com/StationPrediction.svc/json/GetPrediction/All?api_key=${apiKey}`;

const trains = new Command(trainsUrl, 'Trains');

export default function(name) {
  trains.getResults().then(data => {
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
