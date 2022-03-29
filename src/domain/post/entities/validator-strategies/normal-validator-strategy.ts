import { ID } from 'src/domain/base/value-objects/id';
import { EmptyPostMessageException } from 'src/domain/post/exceptions/empty-post-message.exception';
import { Message } from '../value-objects/message';
import { ValidatorStrategy } from './contracts/validator-strategy';

export class NormalValidatorStrategy implements ValidatorStrategy {
  validate(referencedPostId?: ID, message?: Message) {
    if (message.value === '') {
      throw new EmptyPostMessageException();
    }
  }
}
