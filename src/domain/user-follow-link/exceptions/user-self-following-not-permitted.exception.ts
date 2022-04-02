import { BaseDomainException } from 'src/domain/base/base-domain-exception';
import { USER_SELF_FOLLOWING_NOT_PERMITTED_CODE } from './codes';

export class UserSelfFollowingNotPermittedException extends BaseDomainException {
  constructor() {
    super(
      'User self following is not permitted.',
      USER_SELF_FOLLOWING_NOT_PERMITTED_CODE,
    );
  }
}
