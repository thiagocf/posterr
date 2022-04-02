import { ID } from 'src/domain/base/value-objects/id';
import { ReferencedPostNotFoundException } from 'src/domain/post/exceptions/referenced-post-not-found.exception';
import { RepostMessageIsNotAllowedException } from '../../exceptions/repost-message-is-not-allowed.exception copy';
import { Message } from '../value-objects/message';
import { ValidatorStrategy } from './contracts/validator-strategy';

export class RepostValidatorStrategy implements ValidatorStrategy {
  validate(referencedPostId?: ID, message?: Message) {
    if (!referencedPostId) {
      throw new ReferencedPostNotFoundException();
    }

    if (message && message.value) {
      throw new RepostMessageIsNotAllowedException();
    }
  }
}
