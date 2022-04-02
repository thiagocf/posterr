import { BaseDomainException } from 'src/domain/base/base-domain-exception';

export class InvalidUsernameLengthException extends BaseDomainException {
  constructor() {
    super('Invalid username length.', 'InvalidUsernameLengthException');
  }
}
