import { Create, Remove } from 'src/domain/base/repository-ports';
import { UserFollowLinkEntity } from '../entities/user-follow-link.entity';

type UserFollowLinkId = {
  userId: string;
  followingUserId: string;
};

export type CreateUserFollowLinkRepository = Create<
  UserFollowLinkId,
  UserFollowLinkEntity
>;

export type RemoveUserFollowLinkRepository = Remove<UserFollowLinkId, void>;

export interface FindOneUserFollowLinkRepository {
  findOneById(id: UserFollowLinkId): Promise<UserFollowLinkEntity>;
}
