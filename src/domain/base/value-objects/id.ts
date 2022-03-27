import { ValueObject } from 'src/domain/base/value-object';
import { randomUUID } from 'crypto';

export class ID implements ValueObject {
  constructor(private readonly id?: string) {
    if (!id) {
      this.id = randomUUID();
    }
  }

  get value() {
    return this.id;
  }
}
