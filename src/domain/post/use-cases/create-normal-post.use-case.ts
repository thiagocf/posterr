import { UseCase } from 'src/domain/base/use-case';
import { PostType } from '../entities/post-type';
import { PostEntity } from '../entities/post.entity';
import { CreatePostRepository } from '../repositories/post.repository';

type CreateNormalPostParams = {
  message: string;
  authorId: string;
};

export class CreateNormalPostUseCase implements UseCase<PostEntity> {
  constructor(
    private readonly postRepository: CreatePostRepository,
    private readonly params: CreateNormalPostParams,
  ) {}

  execute(): Promise<PostEntity> {
    const post = new PostEntity({
      ...this.params,
      type: PostType.NORMAL,
    });
    return this.postRepository.create(post);
  }
}
