import Command from './command.js';
import { bold } from '../utils/format.js';
import { basicTable, vAlignCenter } from '../utils/table.js';
import { apiKey } from '../utils/constants.js';

const incidentsUrl =
  `https://api.wmata.com/Incidents.svc/json/Incidents?api_key=${apiKey}`;

const incidents = new Command(incidentsUrl, 'Incidents');

export default function() {
  incidents.getResults().then(data => {
    const incidentsTable = basicTable();

    incidentsTable.push([
      { colSpan: 36, content: 'Incidents', hAlign: 'center' },
    ]);
    incidentsTable.push(
      vAlignCenter([
        {
          colSpan: 6,
          content: bold('Type'),
          hAlign: 'center',
        },
        {
          colSpan: 6,
          content: bold('Line(s)'),
          hAlign: 'center',
        },
        {
          colSpan: 24,
          content: bold('Description'),
        },
      ])
    );

    Object.keys(data).forEach(key => {
      const type = data[key].IncidentType;
      const lines = data[key].LinesAffected.split(/;[\s]?/)
        .filter(fn => fn !== '')
        .join();
      const description = data[key].Description;

      incidentsTable.push(
        vAlignCenter([
          {
            colSpan: 6,
            content: `${type}`,
            hAlign: 'center',
          },
          {
            colSpan: 6,
            content: `${lines}`,
            hAlign: 'center',
          },
          {
            colSpan: 24,
            content: `${description}`,
          },
        ])
      );
    });

    if (data.length === 0) {
      incidentsTable.push([
        { colSpan: 36, content: 'Hooray!  No incidents at this time' },
      ]);
    }

    console.log(incidentsTable.toString());
  });
}
