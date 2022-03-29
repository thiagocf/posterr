import { UseCase } from 'src/domain/base/use-case';
import { PostType } from '../entities/post-type';
import { PostEntity } from '../entities/post.entity';
import { PostsLimitExceededException } from '../exceptions/posts-limit-exceeded.exception';
import { RepostingARepostNotAllowedException } from '../exceptions/reposting-a-respost-not-allowed.exception';
import {
  CountPostsRepository,
  CreatePostRepository,
  FindOneByIdPostRepository,
} from '../repositories/post.repository';

type CreatePostParams = {
  authorId: string;
  type: PostType;
  message?: string;
  referencedPostId?: string;
};

type PostRepository = CreatePostRepository &
  FindOneByIdPostRepository &
  CountPostsRepository;

const MAX_AUTHOR_POSTS_PER_DAY = 5;

export class CreatePostUseCase implements UseCase<PostEntity> {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly params: CreatePostParams,
  ) {}

  async execute(): Promise<PostEntity> {
    await this.validatePostsLimit();
    if (this.params.type === PostType.REPOST) await this.validateRepost();
    const post = new PostEntity(this.params);
    return this.postRepository.create(post);
  }

  private async validatePostsLimit(): Promise<void> {
    const count = await this.postRepository.countTodayPostsByAuthorId(
      this.params.authorId,
    );
    if (count >= MAX_AUTHOR_POSTS_PER_DAY) {
      throw new PostsLimitExceededException();
    }
  }

  private async validateRepost(): Promise<void> {
    const referencedPost = await this.postRepository.findOneById(
      this.params.referencedPostId,
    );

    if (referencedPost.type === PostType.REPOST) {
      throw new RepostingARepostNotAllowedException();
    }
  }
}
