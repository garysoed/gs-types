import { assert, should, test } from '@gs-testing';

import { Type } from './type';
import { TypeAssertionError } from './type-assertion-error';
import { ValidationResult } from './validation-result';

class TestType extends Type<number> {
  constructor(private readonly result: ValidationResult) {
    super();
  }

  toString(): string {
    return 'TestType';
  }

  validate(): ValidationResult {
    return this.result;
  }
}

test('@types/core/type', () => {
  test('assert', () => {
    should(`throw error if validation does not pass`, () => {
      const cause1 = 'cause1';
      const cause2 = 'cause2';
      const type: Type<number> = new TestType({causes: [cause1, cause2], passes: false});

      let caughtError: TypeAssertionError|null = null;
      try {
        type.assert(1);
      } catch (e) {
        caughtError = e;
      }

      assert(caughtError).toNot.beNull();
      assert(caughtError!.causes).to.haveExactElements([
        cause1,
        cause2,
      ]);
    });

    should(`not throw error if validation passes`, () => {
      const type: Type<number> = new TestType({passes: true});

      assert(() => type.assert(1)).toNot.throw();
    });
  });

  test('check', () => {
    should(`return true if validation passes`, () => {
      const type = new TestType({passes: true});

      assert(type.check(1)).to.beTrue();
    });

    should(`return false if validation does not pass`, () => {
      const type = new TestType({causes: [], passes: false});

      assert(type.check(1)).to.beFalse();
    });
  });
});