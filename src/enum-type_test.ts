import { assert } from 'gs-testing/export/main';
import { EnumType } from './enum-type';

describe('check.EnumType', () => {
  describe('check', () => {
    it(`should return true if the value is in the enum`, () => {
      /**
       * @test
       */
      enum Test { A, B }
      assert(EnumType(Test).check(Test.A)).to.beTrue();
    });

    it(`should return false if the value is not in the enum`, () => {
      /**
       * @test
       */
      enum Test { A, B }

      /**
       * @test
       */
      enum Test2 { A, B, C }

      assert(EnumType(Test).check(Test2.C)).to.beFalse();
    });
  });
});
