import { describe, it } from "node:test"
import assert from "node:assert"
import { transformLine } from '../utils/format.js';

describe('Format', () => {
  it('line color to return abbreviation', () => {
    const lineColor = transformLine('Red');
    const randomString = transformLine('Stuff');

    assert.strictEqual(lineColor, 'RD');
    assert.strictEqual(randomString, 'stuff');
  });
});
