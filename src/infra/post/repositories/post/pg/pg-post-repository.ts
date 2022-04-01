import { FindManyResponse } from 'src/domain/base/repository-ports';
import { PostType } from 'src/domain/post/entities/post-type';
import { PostEntity } from 'src/domain/post/entities/post.entity';
import {
  FindManyPostsByAuthorRepository,
  FindPostsByIds,
} from 'src/domain/post/repositories/post.repository';

export class PgPostRepository
  implements FindManyPostsByAuthorRepository, FindPostsByIds
{
  findPostsByIds(): Promise<PostEntity[]> {
    return Promise.resolve([
      new PostEntity({
        authorId: 'aaa',
        type: PostType.QUOTE,
        createdAt: new Date(),
        id: '211',
        message: 'Test quote post',
        referencedPostId: '311',
      }),
      new PostEntity({
        authorId: 'aab',
        type: PostType.NORMAL,
        createdAt: new Date(),
        id: '212',
        message: 'Test quote post',
        referencedPostId: '312',
      }),
    ]);
  }

  findManyByAuthorIds(
    authorIds: string[],
  ): Promise<FindManyResponse<PostEntity>> {
    const data = [
      new PostEntity({
        authorId: authorIds[0],
        type: PostType.NORMAL,
        createdAt: new Date(),
        id: '111',
        message: 'Test post',
      }),
      new PostEntity({
        authorId: authorIds[0],
        type: PostType.QUOTE,
        createdAt: new Date(),
        id: '112',
        message: 'Test quote post',
        referencedPostId: '211',
      }),
      new PostEntity({
        authorId: authorIds[0],
        type: PostType.REPOST,
        createdAt: new Date(),
        id: '112',
        referencedPostId: '212',
      }),
    ];

    return Promise.resolve({
      data,
      pagination: {
        nextCursor: Buffer.from('abcd').toString('base64'),
      },
    });
  }
}
