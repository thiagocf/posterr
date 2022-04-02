import { Module } from '@nestjs/common';
import { USER_FOLLOW_LINK_REPOSITORY } from 'src/domain/user-follow-link/repositories/user-follow-link.repository';
import { AuthenticationModule } from '../common/authentication.module';
import { FollowingController } from './api/controllers/following.controller';
import { PgUserFollowLinkRepository } from './repositories/pg-user-follow-link.repository';

@Module({
  imports: [AuthenticationModule],
  controllers: [FollowingController],
  providers: [
    {
      provide: USER_FOLLOW_LINK_REPOSITORY,
      useClass: PgUserFollowLinkRepository,
    },
  ],
  exports: [USER_FOLLOW_LINK_REPOSITORY],
})
export class UserFollowLinkModule {}
