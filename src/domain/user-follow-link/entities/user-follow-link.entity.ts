import { ID } from 'src/domain/base/value-objects/id';
import { UserSelfFollowingNotPermittedException } from '../exceptions/user-self-following-not-permitted.exception';

export type UserFollowLinkProps = {
  userId: string;
  followingUserId: string;
};

export class UserFollowLinkEntity {
  private readonly _userId: ID;
  private readonly _followingUserId: ID;

  constructor(props: UserFollowLinkProps) {
    this._userId = new ID(props.userId);
    this._followingUserId = new ID(props.followingUserId);
    this.validate();
  }

  get userId(): string {
    return this._userId.value;
  }

  get followingUserId(): string {
    return this._followingUserId.value;
  }

  private validate() {
    if (this._userId.value === this._followingUserId.value) {
      throw new UserSelfFollowingNotPermittedException();
    }
  }
}
