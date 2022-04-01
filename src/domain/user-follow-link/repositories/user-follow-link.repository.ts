import { Create, Remove } from 'src/domain/base/repository-ports';
import { UserFollowLinkEntity } from '../entities/user-follow-link.entity';

export const USER_FOLLOW_LINK_REPOSITORY = Symbol('UserFollowLinkRepository');

type UserFollowLinkId = {
  userId: string;
  followingUserId: string;
};

export type CreateUserFollowLinkRepository = Create<
  UserFollowLinkId,
  UserFollowLinkEntity
>;

export type RemoveUserFollowLinkRepository = Remove<UserFollowLinkId, boolean>;

export interface FindManyUserFollowLinkRepository {
  findMany(userId: string): Promise<UserFollowLinkEntity[]>;
}

export interface IsFollowingUserFollowLinkRepository {
  isFollowing(userId: UserFollowLinkId): Promise<boolean>;
}
