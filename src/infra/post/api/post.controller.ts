import { Controller, Get, Inject, Query } from '@nestjs/common';
import { PostType } from 'src/domain/post/entities/post-type';
import { PostEntity } from 'src/domain/post/entities/post.entity';
import {
  FindManyPostsRepository,
  FindPostsByIds,
} from 'src/domain/post/repositories/post.repository';
import { POST_REPOSITORY } from '../repositories/post/constants';
import { PostDto } from './dtos/post.dto';

type PaginationDto = {
  nextCursor: string;
};

type FindManyResponseDto = {
  data: PostDto[];
  pagination: PaginationDto;
};

export type PostRepository = FindManyPostsRepository & FindPostsByIds;

@Controller('/posts')
export class PostController {
  constructor(
    @Inject(POST_REPOSITORY)
    private readonly postRepository: PostRepository,
  ) {}

  @Get()
  async findMany(
    @Query('next_token') nextToken: string,
    @Query('count') count = 10,
  ): Promise<FindManyResponseDto> {
    const paginationParameters = { nextToken, count };
    const { data, pagination } = await this.postRepository.findMany(
      paginationParameters,
    );
    const referencedPostsMap = await this.loadReferencedPostsMap(data);

    const posts = data.map(
      (post) => new PostDto(post, referencedPostsMap[post.referencedPostId]),
    );
    return {
      data: posts,
      pagination,
    };
  }

  private async loadReferencedPostsMap(
    posts: PostEntity[],
  ): Promise<Record<string, PostEntity>> {
    const postIds = posts
      .filter((post) => [PostType.QUOTE, PostType.REPOST].includes(post.type))
      .map(({ id }) => id);
    const referencedPosts = await this.postRepository.findPostsByIds(postIds);
    return referencedPosts.reduce(
      (acc, post) => ({
        [post.id]: post,
        ...acc,
      }),
      {},
    );
  }
}
