import { UserSelfFollowingNotPermittedException } from '../exceptions/user-self-following-not-permitted.exception';
import { UserFollowLinkEntity } from './user-follow-link.entity';

describe('user follow link entity', () => {
  it('should create a user follow link for different users', () => {
    const props = {
      userId: 'abc',
      followingUserId: '123',
    };
    const sut = new UserFollowLinkEntity(props);
    expect(sut.followingUserId).toBe(props.followingUserId);
    expect(sut.userId).toBe(props.userId);
  });

  it('should throw error creating a user follow link when user follows himself', () => {
    const props = {
      userId: 'abc',
      followingUserId: 'abc',
    };
    expect(() => new UserFollowLinkEntity(props)).toThrow(
      UserSelfFollowingNotPermittedException,
    );
  });
});
