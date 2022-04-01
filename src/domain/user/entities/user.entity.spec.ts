import { UserEntity, UserEntityProps } from './user.entity';

describe('user entity', () => {
  it('should create a user entity', () => {
    const props: UserEntityProps = {
      id: '123',
      createdAt: new Date(),
      username: 'test',
      followersCount: 1,
      followingCount: 2,
      postsCount: 3,
    };
    const sut = new UserEntity(props);
    expect(sut.id).toBe(props.id);
    expect(sut.createdAt).toBe(props.createdAt);
    expect(sut.username).toBe(props.username);
    expect(sut.followersCount).toBe(props.followersCount);
    expect(sut.followingCount).toBe(props.followingCount);
    expect(sut.postsCount).toBe(props.postsCount);
  });

  it('should create user entity when no optional fields are provided', () => {
    const props: UserEntityProps = {
      username: 'test',
    };
    const sut = new UserEntity(props);
    expect(sut.id).toBeDefined();
    expect(sut.createdAt).toBeDefined();
    expect(sut.username).toBe(props.username);
    expect(sut.followersCount).toBe(0);
    expect(sut.followingCount).toBe(0);
    expect(sut.postsCount).toBe(0);
  });
});
