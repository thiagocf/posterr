import { UseCase } from 'src/domain/base/use-case';
import { RemoveUserFollowLinkRepository } from '../repositories/user-follow-link.repository';

type UnfollowUserParams = {
  userId: string;
  followingUserId: string;
};

export class UnfollowUserUseCase implements UseCase<boolean> {
  constructor(
    private readonly followRepository: RemoveUserFollowLinkRepository,
    private readonly params: UnfollowUserParams,
  ) {}

  execute(): Promise<boolean> {
    return this.followRepository.remove(this.params);
  }
}
