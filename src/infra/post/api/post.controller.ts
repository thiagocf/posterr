import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';
import { FindManyResponse } from 'src/domain/base/repository-ports';
import { PostEntity } from 'src/domain/post/entities/post.entity';
import { EmptyPostMessageException } from 'src/domain/post/exceptions/empty-post-message.exception';
import { InvalidPostMessageLengthException } from 'src/domain/post/exceptions/invalid-post-message-length.exception';
import { ReferencedPostNotFoundException } from 'src/domain/post/exceptions/referenced-post-not-found.exception';
import { RepostMessageIsNotAllowedException } from 'src/domain/post/exceptions/repost-message-is-not-allowed.exception copy';
import { RepostingARepostNotAllowedException } from 'src/domain/post/exceptions/reposting-a-respost-not-allowed.exception';
import {
  CountPostsRepository,
  CreatePostRepository,
  FindManyPostsByAuthorRepository,
  FindManyPostsRepository,
  FindOneByIdPostRepository,
  FindPostsByIds,
} from 'src/domain/post/repositories/post.repository';
import { CreatePostUseCase } from 'src/domain/post/use-cases/create-post.use-case';
import {
  FindManyUserFollowLinkRepository,
  USER_FOLLOW_LINK_REPOSITORY,
} from 'src/domain/user-follow-link/repositories/user-follow-link.repository';
import {
  AuthenticationService,
  AUTHENTICATION_SERVICE,
} from 'src/infra/common/authentication/authentication-service';
import { POST_REPOSITORY } from '../repositories/post/constants';
import { CreatePostDto } from './dtos/create-post-parameters.dto';
import { PostDto } from './dtos/post.dto';
import { DomainExceptionFilter } from './filters/domain-exception.filter';
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
  FindPostsByIds &
  CreatePostRepository &
  CountPostsRepository &
  FindOneByIdPostRepository;

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

  @Post()
  @UseFilters(DomainExceptionFilter)
  async create(@Body() body: CreatePostDto): Promise<PostDto> {
    const authorId = await this.authenticationService.getAuthenticatedUserId();
    const useCase = new CreatePostUseCase(this.postRepository, {
      authorId,
      ...body,
    });
    const createdPost = await useCase.execute();
    const referencedPost = createdPost.referencedPostId
      ? await this.postRepository.findOneById(createdPost.referencedPostId)
      : undefined;
    return new PostDto(createdPost, referencedPost);
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
