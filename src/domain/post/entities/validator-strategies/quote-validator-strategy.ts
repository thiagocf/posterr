import { EmptyPostMessageException } from 'src/domain/post/exceptions/empty-post-message.exception';
import { ReferencedPostNotFoundException } from 'src/domain/post/exceptions/referenced-post-not-found.exception';
import { ReferencedPost } from '../post.entity';
import { ValidatorStrategy } from './contracts/validator-strategy';

export class QuoteValidatorStrategy implements ValidatorStrategy {
  validate(referencedPost?: ReferencedPost, message?: string) {
    if (!referencedPost) {
      throw new ReferencedPostNotFoundException();
    }

    if (message === '') {
      throw new EmptyPostMessageException();
    }
  }
}
