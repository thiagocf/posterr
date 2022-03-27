import { EmptyPostMessageException } from 'src/domain/post/exceptions/empty-post-message.exception';
import { ReferencedPost } from '../post.entity';
import { ValidatorStrategy } from './contracts/validator-strategy';

export class NormalValidatorStrategy implements ValidatorStrategy {
  validate(referencedPost?: ReferencedPost, message?: string) {
    if (!message) {
      throw new EmptyPostMessageException();
    }
  }
}
