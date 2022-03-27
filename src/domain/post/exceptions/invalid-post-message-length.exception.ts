import { BaseException } from 'src/domain/base/base-exception';

export class InvalidPostMessageLengthException extends BaseException {
  constructor() {
    super('Invalid post message length.', 'InvalidPostMessageLengthException');
  }
}
