import { UserFollowLinkEntity } from 'src/domain/user-follow-link/entities/user-follow-link.entity';
import {
  FindManyUserFollowLinkRepository,
  IsFollowingUserFollowLinkRepository,
} from 'src/domain/user-follow-link/repositories/user-follow-link.repository';
import * as crypto from 'crypto';

export class PgUserFollowLinkRepository
  implements
    FindManyUserFollowLinkRepository,
    IsFollowingUserFollowLinkRepository
{
  isFollowing(): Promise<boolean> {
    return Promise.resolve(true);
  }

  findMany(userId: string): Promise<UserFollowLinkEntity[]> {
    return Promise.resolve([
      new UserFollowLinkEntity({
        userId,
        followingUserId: crypto.randomUUID(),
      }),
      new UserFollowLinkEntity({
        userId,
        followingUserId: crypto.randomUUID(),
      }),
      new UserFollowLinkEntity({
        userId,
        followingUserId: crypto.randomUUID(),
      }),
      new UserFollowLinkEntity({
        userId,
        followingUserId: crypto.randomUUID(),
      }),
      new UserFollowLinkEntity({
        userId,
        followingUserId: crypto.randomUUID(),
      }),
    ]);
  }
}
