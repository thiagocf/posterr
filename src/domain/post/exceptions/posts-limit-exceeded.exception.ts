import { BaseException } from 'src/domain/base/base-exception';

export class PostsLimitExceededException extends BaseException {
  constructor() {
    super('Posts limit exceeded.', 'PostsLimitExceededException');
  }
}
