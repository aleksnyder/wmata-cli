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

const incidentsUrl =
  'https://api.wmata.com/Incidents.svc/json/Incidents?api_key=f640f6ee5156453b864f6582f585dd73';

const getIncidents = async url => {
  try {
    const response = await axios.get(url);
    return response.data.Incidents;
  } catch (error) {
    console.log(error);
  }
};

export default function() {
  getIncidents(incidentsUrl).then(data => {
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
