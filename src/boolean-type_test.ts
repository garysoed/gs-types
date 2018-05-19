import { assert } from 'gs-testing/export/main';
import { BooleanType } from './boolean-type';

describe('check.BooleanType', () => {
  describe('check', () => {
    it('should return true if the value is a native boolean', () => {
      assert(BooleanType.check(false)).to.beTrue();
    });

    it('should return true if the value is a Boolean object', () => {
      assert(BooleanType.check(Boolean(false))).to.beTrue();
    });

    it('should return false otherwise', () => {
      assert(BooleanType.check(123)).to.beFalse();
    });
  });
});
