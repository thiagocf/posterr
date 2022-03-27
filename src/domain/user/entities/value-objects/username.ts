import { ValueObject } from 'src/domain/base/value-object';
import { InvalidUsernameCharacterException } from '../../exceptions/invalid-username-character.exception';
import { InvalidUsernameLengthException } from '../../exceptions/invalid-username-length.exception';

const MAX_USERNAME_SIZE = 14;

export class Username implements ValueObject {
  constructor(private readonly username: string) {
    this.validate();
  }

  private validate() {
    if (this.username.length > MAX_USERNAME_SIZE) {
      throw new InvalidUsernameLengthException();
    }
    if (!this.username.match(/^[a-z0-9]+$/i)) {
      throw new InvalidUsernameCharacterException();
    }
  }

  get value() {
    return this.username;
  }
}
