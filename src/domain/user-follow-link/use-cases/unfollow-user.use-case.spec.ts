import { UnfollowUserUseCase } from './unfollow-user.use-case';

describe('unfollow user use case', () => {
  const mockRepository = {
    remove: jest.fn().mockReturnValueOnce(true),
  };

  it('should return true on removal success', async () => {
    const props = {
      userId: '111',
      followingUserId: '222',
    };
    const sut = new UnfollowUserUseCase(mockRepository, props);
    const response = await sut.execute();
    expect(response).toBe(true);
  });

  it('should return false on removal failure', async () => {
    const props = {
      userId: '111',
      followingUserId: '222',
    };
    mockRepository.remove.mockReturnValueOnce(false);
    const sut = new UnfollowUserUseCase(mockRepository, props);
    const response = await sut.execute();
    expect(response).toBe(false);
  });
});
