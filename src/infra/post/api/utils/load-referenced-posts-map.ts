import { PostType } from 'src/domain/post/entities/post-type';
import { PostEntity } from 'src/domain/post/entities/post.entity';
import { FindPostsByIds } from 'src/domain/post/repositories/post.repository';

export async function loadReferencedPostsMap(
  postRepository: FindPostsByIds,
  posts: PostEntity[],
): Promise<Record<string, PostEntity>> {
  const postIds = posts
    .filter((post) => [PostType.QUOTE, PostType.REPOST].includes(post.type))
    .map(({ id }) => id);
  const referencedPosts = await postRepository.findPostsByIds(postIds);
  return referencedPosts.reduce(
    (acc, post) => ({
      [post.id]: post,
      ...acc,
    }),
    {},
  );
}
