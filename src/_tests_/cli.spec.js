jest.mock('../command');
jest.mock('../utils/format');

const _exit = process.exit;

let log;
let wcli;

const setup = () => {
  log = require('../utils/format');
  log.error = jest.fn();
  log.bold = jest.fn(s => s);
  wcli = require('../command').default;
  require('..');
};

describe('cli', () => {
  beforeEach(() => {
    process.exit = jest.fn();
  });

  afterEach(() => {
    process.exit = _exit;
    jest.resetModules();
  });

  it('should call error when the command not matched', () => {
    process.argv = ['node', 'bin/cli.js', 'TT'];
    setup();

    expect(log.error).toBeCalledWith(`Unknown command: ${log.bold('TT')}`);
    expect(process.exit).toBeCalledWith(1);
  });

  describe('station command', () => {
    it('should call wmata-cli', () => {
      process.argv = ['node', 'bin/cli.js', 'station', 'Smithsonian'];
      setup();

      expect(wcli.station.mock.calls[0][0]).toBe('Smithsonian');
    });

    it('alias should work', () => {
      process.argv = ['node', 'bin/cli.js', 's', 'Smithsonian'];
      setup();

      expect(wcli.station.mock.calls[0][0]).toBe('Smithsonian');
    });
  });

  describe('list command', () => {
    it('should call wcli and list all stations on Orange line', () => {
      process.argv = ['node', 'bin/cli.js', 'list', 'Orange'];
      setup();

      expect(wcli.list.mock.calls[0][0]).toBe('Orange');
    });

    it('alias should work', () => {
      process.argv = ['node', 'bin/cli.js', 'ls', 'Orange'];
      setup();

      expect(wcli.list.mock.calls[0][0]).toBe('Orange');
    });
  });
});
