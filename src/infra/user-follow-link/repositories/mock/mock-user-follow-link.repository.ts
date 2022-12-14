import { UserFollowLinkEntity } from 'src/domain/user-follow-link/entities/user-follow-link.entity';
import {
  CreateUserFollowLinkRepository,
  FindManyUserFollowLinkRepository,
  IsFollowingUserFollowLinkRepository,
  RemoveUserFollowLinkRepository,
  UserFollowLinkId,
} from 'src/domain/user-follow-link/repositories/user-follow-link.repository';
import * as crypto from 'crypto';

export class MockUserFollowLinkRepository
  implements
    FindManyUserFollowLinkRepository,
    IsFollowingUserFollowLinkRepository,
    CreateUserFollowLinkRepository,
    RemoveUserFollowLinkRepository
{
  remove(): Promise<boolean> {
    return Promise.resolve(true);
  }

  create(data: UserFollowLinkId): Promise<UserFollowLinkEntity> {
    return Promise.resolve(new UserFollowLinkEntity(data));
  }

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
