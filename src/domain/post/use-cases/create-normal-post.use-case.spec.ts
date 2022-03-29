import { PostType } from '../entities/post-type';
import { PostEntity } from '../entities/post.entity';
import * as PostModule from '../entities/post.entity';
import { CreatePostRepository } from '../repositories/post.repository';
import { CreateNormalPostUseCase } from './create-normal-post.use-case';

describe('create normal post use case', () => {
  it('should execute the use case when there is no exceptions', async () => {
    const POST_PROPS = {
      type: PostType.NORMAL,
      authorId: 'abc',
      message: 'Test message',
    };
    const CREATED_POST_ENTITY = new PostEntity(POST_PROPS);
    const mockRepository: CreatePostRepository = {
      create: jest.fn().mockReturnValue(CREATED_POST_ENTITY),
    };
    const sut = new CreateNormalPostUseCase(mockRepository, POST_PROPS);
    const response = await sut.execute();

    expect(response).toBe(CREATED_POST_ENTITY);
  });
});
