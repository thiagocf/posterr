import { ValueObject } from 'src/domain/base/value-object';
import { InvalidPostMessageLengthException } from '../../exceptions/invalid-post-message-length.exception';

const MAX_MESSAGE_SIZE = 777;

export class Message implements ValueObject {
  constructor(private readonly message: string = '') {
    this.validate();
  }

  private validate() {
    if (this.message.length > MAX_MESSAGE_SIZE) {
      throw new InvalidPostMessageLengthException();
    }
  }

  get value() {
    return this.message;
  }
}
