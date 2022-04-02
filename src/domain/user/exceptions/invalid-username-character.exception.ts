import { BaseDomainException } from 'src/domain/base/base-domain-exception';

export class InvalidUsernameCharacterException extends BaseDomainException {
  constructor() {
    super('Invalid username character.', 'InvalidUsernameCharacterException');
  }
}
