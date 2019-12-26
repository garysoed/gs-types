import { Type } from './core/type';
import { ValidationResult } from './core/validation-result';

class InstanceofTypeImpl<T> extends Type<T> {
  constructor(
      private readonly ctor: (new (...args: any[]) => T)|Function,
  ) {
    super();
  }

  toString(): string {
    return `(instanceof ${this.ctor.name})`;
  }

  validate(target: unknown): ValidationResult {
    const passes = target instanceof this.ctor;
    if (passes) {
      return {passes};
    }

    return {
      causes: [`not an instance of ${this.ctor.name}`],
      passes: false,
    };
  }
}

/**
 * Checks if the target is an instance of the given ctor.
 * @param ctor Ctor to check the type.
 * @return The instanceof type.
 */
export function InstanceofType<T>(ctor: (new (...args: any[]) => T) | Function): Type<T> {
  return new InstanceofTypeImpl(ctor);
}
