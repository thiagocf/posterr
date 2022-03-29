import { PostType } from '../entities/post-type';
import { PostEntity } from '../entities/post.entity';
import { PostsLimitExceededException } from '../exceptions/posts-limit-exceeded.exception';
import { RepostingARepostNotAllowedException } from '../exceptions/reposting-a-respost-not-allowed.exception';
import { CreatePostUseCase } from './create-post.use-case';

describe('create post use case', () => {
  const mockRepository = {
    create: jest.fn(),
    findOneById: jest.fn(),
    countTodayPostsByAuthorId: jest.fn().mockResolvedValue(0),
  };

  it('should execute when post type is normal', async () => {
    const POST_PROPS = {
      type: PostType.NORMAL,
      authorId: 'abc',
      message: 'Test message',
    };
    const RESPONSE_POST = new PostEntity(POST_PROPS);
    mockRepository.create.mockResolvedValueOnce(RESPONSE_POST);

    const sut = new CreatePostUseCase(mockRepository, POST_PROPS);
    const response = await sut.execute();
    expect(response).toBe(RESPONSE_POST);
  });

  it('should execute when post type is quote', async () => {
    const POST_PROPS = {
      type: PostType.QUOTE,
      authorId: 'abc',
      message: 'Test message',
      referencedPostId: 'ppp',
    };
    const RESPONSE_POST = new PostEntity(POST_PROPS);
    mockRepository.create.mockResolvedValueOnce(RESPONSE_POST);

    const sut = new CreatePostUseCase(mockRepository, POST_PROPS);
    const response = await sut.execute();
    expect(response).toBe(RESPONSE_POST);
  });

  it('should execute when post type is repost and referenced post is not a repost', async () => {
    const POST_PROPS = {
      type: PostType.REPOST,
      authorId: 'abc',
      message: 'Test message',
      referencedPostId: 'ppp',
    };
    const RESPONSE_POST = new PostEntity(POST_PROPS);
    mockRepository.create.mockResolvedValueOnce(RESPONSE_POST);

    const REF_POST_PROPS = {
      type: PostType.NORMAL,
      authorId: 'abc',
      message: 'Test message',
    };
    const REFERENCED_POST = new PostEntity(REF_POST_PROPS);
    mockRepository.findOneById.mockResolvedValueOnce(REFERENCED_POST);

    const sut = new CreatePostUseCase(mockRepository, POST_PROPS);
    const response = await sut.execute();
    expect(response).toBe(RESPONSE_POST);
  });

  it('should throw error when post type is repost and referenced post is a repost', async () => {
    expect.assertions(1);

    const POST_PROPS = {
      type: PostType.REPOST,
      authorId: 'abc',
      message: 'Test message',
      referencedPostId: 'ppp',
    };
    const RESPONSE_POST = new PostEntity(POST_PROPS);
    mockRepository.create.mockResolvedValueOnce(RESPONSE_POST);

    const REF_POST_PROPS = {
      type: PostType.REPOST,
      authorId: 'abc',
      message: 'Test message',
      referencedPostId: 'qqq',
    };
    const REFERENCED_POST = new PostEntity(REF_POST_PROPS);
    mockRepository.findOneById.mockResolvedValueOnce(REFERENCED_POST);
    const sut = new CreatePostUseCase(mockRepository, POST_PROPS);

    await expect(sut.execute()).rejects.toBeInstanceOf(
      RepostingARepostNotAllowedException,
    );
  });

  it('should throw error when the author posts limit is exceeded.', async () => {
    expect.assertions(1);
    const POST_PROPS = {
      type: PostType.NORMAL,
      authorId: 'abc',
      message: 'Test message',
    };
    mockRepository.countTodayPostsByAuthorId.mockResolvedValueOnce(5);
    const sut = new CreatePostUseCase(mockRepository, POST_PROPS);
    await expect(sut.execute()).rejects.toBeInstanceOf(
      PostsLimitExceededException,
    );
  });
});
