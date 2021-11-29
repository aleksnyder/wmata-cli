import {jest} from '@jest/globals';
import { transformLine } from '../utils/format.js';

const _exit = process.exit;

describe('Format', () => {
  beforeEach(() => {
    process.exit = jest.fn();
  });

  afterEach(() => {
    process.exit = _exit;
    jest.resetModules();
  });

  it('line color to return abbreviation', () => {
    const lineColor = transformLine('Red');
    const randomString = transformLine('Stuff');

    expect(lineColor).toBe('RD');
    expect(randomString).toBe('Stuff');
  });
});
