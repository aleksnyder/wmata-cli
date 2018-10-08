#!/usr/bin/env node

import program from 'commander';
import { bold, error, green } from './utils/format';
import metroCli from './command';

program
  .command('list <color>')
  .alias('ls')
  .on('--help', () => {
    console.log('');
    console.log('  List all available stations running on the specified line.');
    console.log('');
    console.log('  Example:');
    console.log(
      `    ${green(
        'wmata-cli list Orange'
      )}    => Show stations belonging to the Orange line.  Lines include "Orange", "Blue", "Silver", "Green", "Yellow", and "Red"`
    );
    console.log('');
    console.log(`  For more detailed information, please check the GitHub page: ${green(
      'https://github.com/aleksnyder/wmata-cli'
    )}
        `);
  })
  .action(color => {
    metroCli.list(color);
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
  .action(name => {
    metroCli.station(name);
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
    metroCli.incidents();
  });

program.command('*').action(command => {
  error(`Unknown command: ${bold(command)}`);

  process.exit(1);
});

if (process.argv.length === 2) program.help();

program.parse(process.argv);
