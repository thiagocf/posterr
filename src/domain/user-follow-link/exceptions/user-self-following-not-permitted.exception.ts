import { BaseDomainException } from 'src/domain/base/base-domain-exception';

export class UserSelfFollowingNotPermittedException extends BaseDomainException {
  constructor() {
    super(
      'User self following is not permitted.',
      'UserSelfFollowingNotPermittedException',
    );
  }
}
