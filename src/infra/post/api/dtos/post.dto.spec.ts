import { PostType } from 'src/domain/post/entities/post-type';
import { PostEntity } from 'src/domain/post/entities/post.entity';
import { PostDto } from './post.dto';

describe('post dto', () => {
  it('should create dto from a normal post', () => {
    const POST_PROPS = {
      message: 'Post message',
      authorId: 'aaa',
      type: PostType.NORMAL,
      id: '111',
      createdAt: new Date(),
    };
    const post = new PostEntity(POST_PROPS);
    const sut = new PostDto(post);
    expect(sut).toEqual({
      ...POST_PROPS,
      createdAt: POST_PROPS.createdAt.toISOString(),
    });
  });

  it('should create dto with a referenced post', () => {
    const POST_PROPS = {
      message: 'Post message',
      authorId: 'aaa',
      type: PostType.QUOTE,
      id: '111',
      createdAt: new Date(),
      referencedPostId: '211',
    };
    const REFERENCED_POST_PROPS = {
      message: 'Post message',
      authorId: 'aaa',
      type: PostType.NORMAL,
      id: '211',
      createdAt: new Date(),
    };

    const post = new PostEntity(POST_PROPS);
    const referencedPost = new PostEntity(REFERENCED_POST_PROPS);
    const sut = new PostDto(post, referencedPost);
    expect(sut).toEqual({
      message: 'Post message',
      authorId: 'aaa',
      type: PostType.QUOTE,
      id: '111',
      createdAt: POST_PROPS.createdAt.toISOString(),
      referencedPost: {
        ...REFERENCED_POST_PROPS,
        createdAt: REFERENCED_POST_PROPS.createdAt.toISOString(),
      },
    });
  });
});
