import { Controller, Get, Inject, Query } from '@nestjs/common';
import { FindManyResponse } from 'src/domain/base/repository-ports';
import { PostEntity } from 'src/domain/post/entities/post.entity';
import {
  FindManyPostsByAuthorRepository,
  FindManyPostsRepository,
  FindPostsByIds,
} from 'src/domain/post/repositories/post.repository';
import {
  FindManyUserFollowLinkRepository,
  USER_FOLLOW_LINK_REPOSITORY,
} from 'src/domain/user-follow-link/repositories/user-follow-link.repository';
import {
  AuthenticationService,
  AUTHENTICATION_SERVICE,
} from 'src/infra/common/authentication/authentication-service';
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

export type PostRepository = FindManyPostsRepository &
  FindManyPostsByAuthorRepository &
  FindPostsByIds;

@Controller('/posts')
export class PostController {
  constructor(
    @Inject(AUTHENTICATION_SERVICE)
    private readonly authenticationService: AuthenticationService,
    @Inject(USER_FOLLOW_LINK_REPOSITORY)
    private readonly followRepository: FindManyUserFollowLinkRepository,
    @Inject(POST_REPOSITORY)
    private readonly postRepository: PostRepository,
  ) {}

  @Get()
  async findMany(
    @Query('next_token') nextToken: string,
    @Query('count') count = 10,
    @Query('followed_only') followedOnly = false,
  ): Promise<FindManyResponseDto> {
    const paginationParameters = { nextToken, count };
    const findResponse = followedOnly
      ? await this.loadFollowedByUserPosts(paginationParameters)
      : await this.loadAllPosts(paginationParameters);

    const referencedPostsMap = await loadReferencedPostsMap(
      this.postRepository,
      findResponse.data,
    );

    const posts = findResponse.data.map(
      (post) => new PostDto(post, referencedPostsMap[post.referencedPostId]),
    );

    return {
      data: posts,
      pagination: findResponse.pagination,
    };
  }

  private async loadFollowedByUserPosts(
    pagination,
  ): Promise<FindManyResponse<PostEntity>> {
    const userId = await this.authenticationService.getAuthenticatedUserId();
    const followedUserIds = await (
      await this.followRepository.findMany(userId)
    ).map(({ followingUserId }) => followingUserId);
    return this.postRepository.findManyByAuthorIds(followedUserIds, pagination);
  }

  private loadAllPosts(pagination): Promise<FindManyResponse<PostEntity>> {
    return this.postRepository.findMany(pagination);
  }
}
