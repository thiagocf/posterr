import {
  Create,
  FindMany,
  FindManyResponse,
  FindOneById,
  PaginationParameters,
} from 'src/domain/base/repository-ports';
import { PostEntity } from '../entities/post.entity';

export type FindOneByIdPostRepository = FindOneById<string, PostEntity>;

export type FindManyPostsRepository = FindMany<PostEntity>;

export interface FindManyPostsByAuthorRepository {
  findManyByAuthorIds(
    authorIds: string[],
    pagination?: PaginationParameters,
  ): Promise<FindManyResponse<PostEntity>>;
}

export interface FindPostsByIds {
  findPostsByIds(ids: string[]): Promise<PostEntity[]>;
}
export interface CountPostsRepository {
  countTodayPostsByAuthorId(authorId: string): number;
}

export type CreatePostRepository = Create<PostEntity, PostEntity>;
