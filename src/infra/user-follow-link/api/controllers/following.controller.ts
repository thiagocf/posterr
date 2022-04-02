import { Controller, Get, Inject, Param, Post } from '@nestjs/common';
import {
  CreateUserFollowLinkRepository,
  IsFollowingUserFollowLinkRepository,
  USER_FOLLOW_LINK_REPOSITORY,
} from 'src/domain/user-follow-link/repositories/user-follow-link.repository';
import {
  AuthenticationService,
  AUTHENTICATION_SERVICE,
} from 'src/infra/common/authentication/authentication-service';

type IsFollowingUserReponseDto = {
  isFollowing: boolean;
};

type FollowResponseDto = {
  userId: string;
  followingUserId: string;
};

type FollowingRepository = IsFollowingUserFollowLinkRepository &
  CreateUserFollowLinkRepository;

@Controller('following')
export class FollowingController {
  constructor(
    @Inject(AUTHENTICATION_SERVICE)
    private readonly authenticationService: AuthenticationService,
    @Inject(USER_FOLLOW_LINK_REPOSITORY)
    private readonly followingRepository: FollowingRepository,
  ) {}

  @Get('/:followingUserId')
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
  async follow(
    @Param('toFollowUserId') toFollowUserId: string,
  ): Promise<FollowResponseDto> {
    const userId = await this.authenticationService.getAuthenticatedUserId();
    const followLink = await this.followingRepository.create({
      userId,
      followingUserId: toFollowUserId,
    });
    return {
      userId: followLink.userId,
      followingUserId: followLink.followingUserId,
    };
  }
}
