import { UserFollowLinkEntity } from '../entities/user-follow-link.entity';
import { UserSelfFollowingNotPermittedException } from '../exceptions/user-self-following-not-permitted.exception';
import { FollowUserUseCase } from './follow-user.use-case';

describe('follow user use case', () => {
  const FOLLOW_LINK = new UserFollowLinkEntity({
    userId: '111',
    followingUserId: '222',
  });
  const mockRepository = {
    create: jest.fn().mockReturnValueOnce(FOLLOW_LINK),
  };

  it('should execute when no exceptions are thrown', async () => {
    const props = {
      userId: '111',
      toFollowUserId: '222',
    };
    const sut = new FollowUserUseCase(mockRepository, props);
    const response = await sut.execute();
    expect(response).toBe(FOLLOW_LINK);
  });

  it('should throw error when instanciation throws', async () => {
    const props = {
      userId: '111',
      toFollowUserId: '111',
    };
    const sut = new FollowUserUseCase(mockRepository, props);
    await expect(sut.execute()).rejects.toBeInstanceOf(
      UserSelfFollowingNotPermittedException,
    );
  });
});
