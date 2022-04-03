import { UserFollowLinkEntity } from 'src/domain/user-follow-link/entities/user-follow-link.entity';
import {
  CreateUserFollowLinkRepository,
  FindManyUserFollowLinkRepository,
  IsFollowingUserFollowLinkRepository,
  RemoveUserFollowLinkRepository,
  UserFollowLinkId,
} from 'src/domain/user-follow-link/repositories/user-follow-link.repository';
import { EntityManager } from 'typeorm';
import { UserFollowLink } from '../../db/entities/user-follow-link.db-entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeormUserFollowLinkRepository
  implements
    FindManyUserFollowLinkRepository,
    IsFollowingUserFollowLinkRepository,
    CreateUserFollowLinkRepository,
    RemoveUserFollowLinkRepository
{
  constructor(private readonly manager: EntityManager) {}

  async remove(id: UserFollowLinkId): Promise<boolean> {
    await this.manager
      .createQueryBuilder()
      .delete()
      .from(UserFollowLink)
      .where({
        followerUserId: id.userId,
        followingUserId: id.followingUserId,
      })
      .execute();
    return Promise.resolve(true);
  }

  async create(data: UserFollowLinkId): Promise<UserFollowLinkEntity> {
    const link = await this.manager.getRepository(UserFollowLink).save({
      followerUserId: data.userId,
      followingUserId: data.followingUserId,
    });

    return new UserFollowLinkEntity({
      followingUserId: link.followingUserId,
      userId: link.followerUserId,
    });
  }

  async isFollowing(data: UserFollowLinkId): Promise<boolean> {
    const link = await this.manager.getRepository(UserFollowLink).findOne({
      followerUserId: data.userId,
      followingUserId: data.followingUserId,
    });
    return !!link;
  }

  async findMany(userId: string): Promise<UserFollowLinkEntity[]> {
    const links = await this.manager.getRepository(UserFollowLink).find({
      followerUserId: userId,
    });

    return links.map(
      (link) =>
        new UserFollowLinkEntity({
          followingUserId: link.followingUserId,
          userId: link.followerUserId,
        }),
    );
  }
}
