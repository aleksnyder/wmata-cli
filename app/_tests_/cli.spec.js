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

  // TODO: Add tests after Jest supports ES modules.
  // @see https://github.com/facebook/jest/pull/10976
  it('should return true', () => {
    const placeholder = true;

    expect(placeholder).toBe(true);
  });
});
