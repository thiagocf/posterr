import { ID } from 'src/domain/base/value-objects/id';
import { ReferencedPostNotFoundException } from 'src/domain/post/exceptions/referenced-post-not-found.exception';
import { ValidatorStrategy } from './contracts/validator-strategy';

export class RepostValidatorStrategy implements ValidatorStrategy {
  validate(referencedPostId?: ID) {
    if (!referencedPostId) {
      throw new ReferencedPostNotFoundException();
    }
  }
}
