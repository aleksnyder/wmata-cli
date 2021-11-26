import {jest} from '@jest/globals';

const _exit = process.exit;

describe('cli', () => {
  beforeEach(() => {
    process.exit = jest.fn();
  });

  afterEach(() => {
    process.exit = _exit;
    jest.resetModules();
  });

  // TODO: Add tests after typescript/classes refactor
});
