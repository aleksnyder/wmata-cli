import program from 'commander';
import inquirer from 'inquirer';
import { bold, error, wmataGreen } from './utils/format.js';
import station from './command/stations.js';
import list from './command/list.js';
import incidents from './command/incidents.js';

export default () => {
  program
    .command('list')
    .alias('ls')
    .option('-c, --color <color>', 'List stations by line color')
    .on('--help', () => {
      console.log('');
      console.log('  List all available stations running on the specified line.');
      console.log('');
      console.log('  Example:');
      console.log(
        `    ${green(
          'wmata-cli list -c Orange'
        )}    => Show stations belonging to the Orange line.  Lines include "Orange", "Blue", "Silver", "Green", "Yellow", and "Red"`
      );
      console.log('');
      console.log(`  For more detailed information, please check the GitHub page: ${green(
        'https://github.com/aleksnyder/wmata-cli'
      )}
          `);
    })
    .action((/** @type {{ color: any; }} */ option) => {
      if (!option.color) {
        inquirer
          .prompt([
            {
              type: 'list',
              name: 'line',
              message: 'Select a line color:',
              choices: ['Orange', 'Blue', 'Green', 'Yellow', 'Red', 'Silver'],
              default: [],
            },
          ])
          .then(answer => {
            list(answer.line);
          });
      } else {
        list(option.color);
      }
    });

  program
    .command('station <name>')
    .alias('s')
    .on('--help', () => {
      console.log('');
      console.log(
        '  List trains arriving or soon to be arriving at the specified station'
      );
      console.log('');
      console.log('  Example:');
      console.log(
        `    ${green(
          'wmata-cli station Smithsonian'
        )}    => Show stations belonging to a particular line.  Lines include "Orange", "Blue", "Silver", "Green", "Yellow", and "Red"`
      );
      console.log('');
      console.log(`  For more detailed information, please check the GitHub page: ${green(
        'https://github.com/aleksnyder/wmata-cli'
      )}
          `);
    })
    .action((/** @type {any} */ name) => {
      station(name);
    });

  program
    .command('incidents')
    .alias('i')
    .on('--help', () => {
      console.log('');
      console.log('  List outages in the WMATA system');
      console.log('');
      console.log(`  For more detailed information, please check the GitHub page: ${green(
        'https://github.com/aleksnyder/wmata-cli'
      )}
          `);
    })
    .action(() => {
      incidents();
    });

  program.command('*').action(command => {
    error(`Unknown command: ${bold(command)}`);

    process.exit(1);
  });

  // If the command following 'wcli' or 'wmata-cli' doesn't match the
  // above commands, display the 'help' command to steer the user
  // in the right direction.
  if (process.argv.length === 2) program.help();

  program.parse(process.argv);
}