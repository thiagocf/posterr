import { Module } from '@nestjs/common';
import { USER_FOLLOW_LINK_REPOSITORY } from 'src/domain/user-follow-link/repositories/user-follow-link.repository';
import { PgUserFollowLinkRepository } from './repositories/pg-user-follow-link.repository';

@Module({
  providers: [
    {
      provide: USER_FOLLOW_LINK_REPOSITORY,
      useClass: PgUserFollowLinkRepository,
    },
  ],
  exports: [USER_FOLLOW_LINK_REPOSITORY],
})
export class UserFollowLinkModule {}
