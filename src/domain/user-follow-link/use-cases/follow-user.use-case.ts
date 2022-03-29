import { UseCase } from 'src/domain/base/use-case';
import { UserFollowLinkEntity } from '../entities/user-follow-link.entity';
import { CreateUserFollowLinkRepository } from '../repositories/user-follow-link.repository';

type FollowUserParams = {
  userId: string;
  toFollowUserId: string;
};

export class FollowUserUseCase implements UseCase<UserFollowLinkEntity> {
  constructor(
    private readonly followRepository: CreateUserFollowLinkRepository,
    private readonly params: FollowUserParams,
  ) {}

  async execute(): Promise<UserFollowLinkEntity> {
    const followLink = new UserFollowLinkEntity({
      followingUserId: this.params.toFollowUserId,
      userId: this.params.userId,
    });
    return this.followRepository.create(followLink);
  }
}
