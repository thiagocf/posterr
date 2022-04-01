import { PostType } from 'src/domain/post/entities/post-type';
import { PostEntity } from 'src/domain/post/entities/post.entity';

type ReferencedPostDto = {
  id: string;
  type: PostType;
  authorId: string;
  createdAt: string;
  message?: string;
  referencedPostId?: string;
};

export class PostDto {
  id: string;
  message?: string;
  type: PostType;
  authorId: string;
  createdAt: string;
  referencedPost?: ReferencedPostDto;

  constructor(post: PostEntity, referencedPost?: PostEntity) {
    this.id = post.id;
    this.message = post.message;
    this.type = post.type;
    this.authorId = post.authorId;
    this.createdAt = post.createdAt.toISOString();

    if (referencedPost) {
      this.referencedPost = {
        id: referencedPost.id,
        message: referencedPost.message,
        type: referencedPost.type,
        authorId: referencedPost.authorId,
        createdAt: referencedPost.createdAt.toISOString(),
        referencedPostId: referencedPost.referencedPostId,
      };
    }
  }
}
