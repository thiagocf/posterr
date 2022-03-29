import { ID } from 'src/domain/base/value-objects/id';
import { EmptyPostMessageException } from 'src/domain/post/exceptions/empty-post-message.exception';
import { ReferencedPostNotFoundException } from 'src/domain/post/exceptions/referenced-post-not-found.exception';
import { Message } from '../value-objects/message';
import { ValidatorStrategy } from './contracts/validator-strategy';

export class QuoteValidatorStrategy implements ValidatorStrategy {
  validate(referencedPostId?: ID, message?: Message) {
    if (!referencedPostId) {
      throw new ReferencedPostNotFoundException();
    }

    if (message.value === '') {
      throw new EmptyPostMessageException();
    }
  }
}
