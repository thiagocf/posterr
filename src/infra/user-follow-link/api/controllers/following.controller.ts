import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
  UseFilters,
} from '@nestjs/common';
import {
  CreateUserFollowLinkRepository,
  IsFollowingUserFollowLinkRepository,
  RemoveUserFollowLinkRepository,
  USER_FOLLOW_LINK_REPOSITORY,
} from 'src/domain/user-follow-link/repositories/user-follow-link.repository';
import { FollowUserUseCase } from 'src/domain/user-follow-link/use-cases/follow-user.use-case';
import { UnfollowUserUseCase } from 'src/domain/user-follow-link/use-cases/unfollow-user.use-case';
import {
  AuthenticationService,
  AUTHENTICATION_SERVICE,
} from 'src/infra/common/authentication/authentication-service';
import { UserFollowLinkDomainExceptionFilter } from '../../filters/user-follow-link-domain-exception.filter';

type IsFollowingUserReponseDto = {
  isFollowing: boolean;
};

type FollowResponseDto = {
  userId: string;
  followingUserId: string;
};

type FollowingRepository = IsFollowingUserFollowLinkRepository &
  CreateUserFollowLinkRepository &
  RemoveUserFollowLinkRepository;

@Controller('following')
export class FollowingController {
  constructor(
    @Inject(AUTHENTICATION_SERVICE)
    private readonly authenticationService: AuthenticationService,
    @Inject(USER_FOLLOW_LINK_REPOSITORY)
    private readonly followingRepository: FollowingRepository,
  ) {}

  @Get('/:followingUserId')
  @UseFilters(UserFollowLinkDomainExceptionFilter)
  async isFollowingUser(
    @Param('followingUserId') followingUserId: string,
  ): Promise<IsFollowingUserReponseDto> {
    const userId = await this.authenticationService.getAuthenticatedUserId();
    const isFollowing = await this.followingRepository.isFollowing({
      userId,
      followingUserId,
    });
    return { isFollowing };
  }

  @Post('/:toFollowUserId')
  @UseFilters(UserFollowLinkDomainExceptionFilter)
  async follow(
    @Param('toFollowUserId') toFollowUserId: string,
  ): Promise<FollowResponseDto> {
    const userId = await this.authenticationService.getAuthenticatedUserId();
    const useCase = new FollowUserUseCase(this.followingRepository, {
      toFollowUserId,
      userId,
    });
    const followLink = await useCase.execute();
    return {
      userId: followLink.userId,
      followingUserId: followLink.followingUserId,
    };
  }

  @Delete('/:toUnfollowUserId')
  @HttpCode(204)
  @UseFilters(UserFollowLinkDomainExceptionFilter)
  async unfollow(
    @Param('toUnfollowUserId') toUnfollowUserId: string,
  ): Promise<void> {
    const userId = await this.authenticationService.getAuthenticatedUserId();
    const useCase = new UnfollowUserUseCase(this.followingRepository, {
      followingUserId: toUnfollowUserId,
      userId,
    });
    await useCase.execute();
  }
}
