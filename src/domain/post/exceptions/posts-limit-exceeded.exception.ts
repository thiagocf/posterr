import { BaseDomainException } from 'src/domain/base/base-domain-exception';
import { POSTS_LIMIT_EXCEEDED_CODE } from './codes';

export class PostsLimitExceededException extends BaseDomainException {
  constructor() {
    super('Posts limit exceeded.', POSTS_LIMIT_EXCEEDED_CODE);
  }
}
