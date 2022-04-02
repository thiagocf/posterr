import { Controller, Get, Inject, Param } from '@nestjs/common';
import {
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

@Controller('following')
export class FollowingController {
  constructor(
    @Inject(AUTHENTICATION_SERVICE)
    private readonly authenticationService: AuthenticationService,
    @Inject(USER_FOLLOW_LINK_REPOSITORY)
    private readonly followingRepository: IsFollowingUserFollowLinkRepository,
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
}
