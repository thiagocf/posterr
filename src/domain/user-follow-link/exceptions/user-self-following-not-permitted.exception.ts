import { BaseException } from 'src/domain/base/base-exception';

export class UserSelfFollowingNotPermittedException extends BaseException {
  constructor() {
    super(
      'User self following is not permitted.',
      'UserSelfFollowingNotPermittedException',
    );
  }
}
