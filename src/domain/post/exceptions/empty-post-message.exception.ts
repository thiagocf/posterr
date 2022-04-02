import { BaseDomainException } from 'src/domain/base/base-domain-exception';
import { EMPTY_POST_MESSAGE_CODE } from './codes';

export class EmptyPostMessageException extends BaseDomainException {
  constructor() {
    super('Empty post message.', EMPTY_POST_MESSAGE_CODE);
  }
}
