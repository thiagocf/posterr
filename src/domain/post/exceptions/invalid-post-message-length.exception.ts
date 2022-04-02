import { BaseDomainException } from 'src/domain/base/base-domain-exception';
import { INVALID_POST_MESSAGE_LENGTH_CODE } from './codes';

export class InvalidPostMessageLengthException extends BaseDomainException {
  constructor() {
    super('Invalid post message length.', INVALID_POST_MESSAGE_LENGTH_CODE);
  }
}
