import { Injectable } from '@nestjs/common';
import {
  FindManyResponse,
  PaginationParameters,
  PaginationResponse,
} from 'src/domain/base/repository-ports';
import { PostEntity } from 'src/domain/post/entities/post.entity';
import {
  CountPostsRepository,
  CreatePostRepository,
  FindManyPostsByAuthorRepository,
  FindManyPostsRepository,
  FindOneByIdPostRepository,
  FindPostsByIds,
} from 'src/domain/post/repositories/post.repository';
import { Post } from 'src/infra/post/db/entities/post.db-entity';
import {
  EntityManager,
  FindManyOptions,
  In,
  LessThanOrEqual,
  MoreThanOrEqual,
} from 'typeorm';

@Injectable()
export class TypeormPostRepository
  implements
    FindManyPostsByAuthorRepository,
    FindPostsByIds,
    FindManyPostsRepository,
    CreatePostRepository,
    CountPostsRepository,
    FindOneByIdPostRepository
{
  constructor(private readonly manager: EntityManager) {}

  async create(post: PostEntity): Promise<PostEntity> {
    const dateIdCursor = post.createdAt.toISOString() + post.id;
    await this.manager.getRepository(Post).save({
      id: post.id,
      authorId: post.authorId,
      createdAt: post.createdAt,
      message: post.message,
      referencedPostId: post.referencedPostId,
      type: post.type,
      dateIdCursor,
    });
    return post;
  }

  async countTodayPostsByAuthorId(authorId: string): Promise<number> {
    const dateStr = new Date().toISOString().split('T')[0];
    const timestampStr = new Date(dateStr).toISOString();
    const posts = await this.manager.getRepository(Post).find({
      where: { createdAt: MoreThanOrEqual(timestampStr), authorId },
    });

    return posts.length;
  }

  async findOneById(id: string): Promise<PostEntity> {
    const post = await this.manager.getRepository(Post).findOne(id);
    return new PostEntity(post);
  }

  async findPostsByIds(ids: string[]): Promise<PostEntity[]> {
    const posts = await this.manager.getRepository(Post).findByIds(ids);
    return posts.map((post) => new PostEntity(post));
  }

  async findMany(
    pagination: PaginationParameters,
  ): Promise<FindManyResponse<PostEntity>> {
    const limit = pagination.count + 1;
    const findParams: FindManyOptions<Post> = {
      order: {
        dateIdCursor: 'DESC',
      },
      take: limit,
    };

    if (pagination.nextToken) {
      const cursor = this.decodeToken(pagination.nextToken);
      findParams.where = {
        dateIdCursor: LessThanOrEqual(cursor),
      };
    }

    const posts = await this.manager.getRepository(Post).find(findParams);
    const nextPost = this.popNextPost(posts, limit);

    return {
      data: posts.map((post) => new PostEntity(post)),
      pagination: this.getPaginationResponse(nextPost),
    };
  }

  async findManyByAuthorIds(
    authorIds: string[],
    pagination: PaginationParameters,
  ): Promise<FindManyResponse<PostEntity>> {
    const limit = pagination.count + 1;
    const findParams: FindManyOptions<Post> = {
      where: {
        authorId: In(authorIds),
      },
      order: {
        dateIdCursor: 'DESC',
      },
      take: limit,
    };

    if (pagination.nextToken) {
      const cursor = this.decodeToken(pagination.nextToken);
      findParams.where['dateIdCursor'] = LessThanOrEqual(cursor);
    }
    const posts = await this.manager.getRepository(Post).find(findParams);
    const nextPost = this.popNextPost(posts, limit);

    return {
      data: posts.map((post) => new PostEntity(post)),
      pagination: this.getPaginationResponse(nextPost),
    };
  }

  private popNextPost(posts: Post[], limit: number) {
    return posts.length === limit ? posts.pop() : undefined;
  }

  private getPaginationResponse(nextPost: Post): PaginationResponse {
    if (!nextPost) return;
    return {
      nextToken: this.encodeToken(nextPost.dateIdCursor),
    };
  }

  private encodeToken(cursor: string) {
    return Buffer.from(cursor).toString('base64');
  }

  private decodeToken(token: string) {
    return Buffer.from(token, 'base64').toString('utf-8');
  }
}
