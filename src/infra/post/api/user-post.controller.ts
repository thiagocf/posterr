import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import {
  FindManyPostsByAuthorRepository,
  FindPostsByIds,
} from 'src/domain/post/repositories/post.repository';
import { POST_REPOSITORY } from '../repositories/post/constants';
import { PostDto } from './dtos/post.dto';
import { loadReferencedPostsMap } from './utils/load-referenced-posts-map';

type PaginationDto = {
  nextCursor: string;
};

type FindManyResponseDto = {
  data: PostDto[];
  pagination: PaginationDto;
};

export type PostRepository = FindManyPostsByAuthorRepository & FindPostsByIds;

@Controller('users/:userId/posts')
export class UserPostController {
  constructor(
    @Inject(POST_REPOSITORY)
    private readonly postRepository: PostRepository,
  ) {}

  @Get()
  async findMany(
    @Param('userId') userId: string,
    @Query('next_token') nextToken: string,
    @Query('count') count = 5,
  ): Promise<FindManyResponseDto> {
    const paginationParameters = { nextToken, count };
    const { data, pagination } = await this.postRepository.findManyByAuthorIds(
      [userId],
      paginationParameters,
    );
    const referencedPostsMap = await loadReferencedPostsMap(
      this.postRepository,
      data,
    );

    const posts = data.map(
      (post) => new PostDto(post, referencedPostsMap[post.referencedPostId]),
    );
    return {
      data: posts,
      pagination,
    };
  }
}
