import { BaseException } from 'src/domain/base/base-exception';

export class InvalidUsernameCharacterException extends BaseException {
  constructor() {
    super('Invalid username character.', 'InvalidUsernameCharacterException');
  }
}
