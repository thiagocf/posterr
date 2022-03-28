import { ID } from 'src/domain/base/value-objects/id';
import { EmptyPostMessageException } from '../../exceptions/empty-post-message.exception';
import { ReferencedPostNotFoundException } from '../../exceptions/referenced-post-not-found.exception';
import { PostType } from '../post-type';
import { ReferencedPost } from '../post.entity';
import { Message } from '../value-objects/message';
import { QuoteValidatorStrategy } from './quote-validator-strategy';

describe('quote post type', () => {
  const strategy = new QuoteValidatorStrategy();
  const referencedPost: ReferencedPost = {
    id: new ID('123'),
    message: new Message('Referenced post message.'),
    type: PostType.NORMAL,
    authorId: new ID('abc'),
    referencedPostId: new ID('321'),
  };

  it('should not throw exceptions if there is a message and referenced post', () => {
    expect(strategy.validate(referencedPost, 'Test message')).toBeUndefined();
  });

  it('should throw error when creating a quote post and the message is empty', () => {
    expect(() => strategy.validate(referencedPost, '')).toThrow(
      EmptyPostMessageException,
    );
  });

  it('should throw error when creating a quote post and there is no referenced post', () => {
    expect(() => strategy.validate(undefined, 'Test message')).toThrow(
      ReferencedPostNotFoundException,
    );
  });
});
