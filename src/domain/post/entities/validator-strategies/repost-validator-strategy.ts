import { ReferencedPostNotFoundException } from 'src/domain/post/exceptions/referenced-post-not-found.exception';
import { RepostARepostNotAllowedException } from 'src/domain/post/exceptions/repost-a-respost-not-allowed.exception';
import { PostType } from '../post-type';
import { ReferencedPost } from '../post.entity';
import { ValidatorStrategy } from './contracts/validator-strategy';

export class RepostValidatorStrategy implements ValidatorStrategy {
  validate(referencedPost?: ReferencedPost) {
    if (!referencedPost) {
      throw new ReferencedPostNotFoundException();
    }

    if (referencedPost.type === PostType.REPOST) {
      throw new RepostARepostNotAllowedException();
    }
  }
}
