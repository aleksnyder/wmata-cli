import Command from './command.js';
import { bold } from '../utils/format.js';
import { basicTable, vAlignCenter } from '../utils/table.js';
import { apiKey } from '../utils/constants.js';

const incidentsUrl =
  `https://api.wmata.com/Incidents.svc/json/Incidents?api_key=${apiKey}`;

const incidents = new Command(incidentsUrl, 'Incidents');

export default function() {
  incidents.getResults().then(data => {
    const incidentsTable = basicTable({
      colWidths: [20, 20, 60],
      wordWrap: true,
      wrapOnWordBoundary: false
    });

    incidentsTable.push(
      vAlignCenter([
        {
          content: bold('Type'),
          hAlign: 'center',
        },
        {
          content: bold('Line(s)'),
          hAlign: 'center',
        },
        {
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
            content: `${type}`,
            hAlign: 'center',
          },
          {
            content: `${lines}`,
            hAlign: 'center',
          },
          {
            content: `${description}`,
          },
        ])
      );
    });

    if (data.length === 0) {
      incidentsTable.push([
        { content: 'Hooray!  No incidents at this time' },
      ]);
    }

    console.log(incidentsTable.toString());
  });
}
