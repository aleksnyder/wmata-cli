import { describe, it } from "node:test"
import assert from "node:assert"
import { isNumber } from '../utils/helpers.js';

describe('Verify', () => {
  it('value is the number type', () => {
    assert.strictEqual(isNumber(1), true);
    assert.strictEqual(isNumber('1'), false);
  });
});
