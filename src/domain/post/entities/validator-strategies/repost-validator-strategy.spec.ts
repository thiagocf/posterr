import { ID } from 'src/domain/base/value-objects/id';
import { ReferencedPostNotFoundException } from '../../exceptions/referenced-post-not-found.exception';
import { RepostARepostNotAllowedException } from '../../exceptions/repost-a-respost-not-allowed.exception';
import { PostType } from '../post-type';
import { ReferencedPost } from '../post.entity';
import { Message } from '../value-objects/message';
import { RepostValidatorStrategy } from './repost-validator-strategy';

describe('repost post type', () => {
  const strategy = new RepostValidatorStrategy();
  const referencedPost: ReferencedPost = {
    id: new ID('123'),
    message: new Message('Referenced post message.'),
    type: PostType.NORMAL,
  };

  it('should not throw exceptions if there is a referenced post', () => {
    expect(strategy.validate(referencedPost)).toBeUndefined();
  });

  it('should throw error when the referenced post is a repost', () => {
    const referencedPost: ReferencedPost = {
      id: new ID('123'),
      message: new Message('Referenced post message.'),
      type: PostType.REPOST,
      referencedPostId: new ID('321'),
    };
    expect(() => strategy.validate(referencedPost)).toThrow(
      RepostARepostNotAllowedException,
    );
  });

  it('should throw error when the referenced post is not defined', () => {
    expect(() => strategy.validate()).toThrow(ReferencedPostNotFoundException);
  });
});
