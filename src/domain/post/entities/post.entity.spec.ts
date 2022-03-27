import { ID } from 'src/domain/base/value-objects/id';
import { EmptyPostMessageException } from '../exceptions/empty-post-message.exception';
import { ReferencedPostNotFoundException } from '../exceptions/referenced-post-not-found.exception';
import { RepostARepostNotAllowedException } from '../exceptions/repost-a-respost-not-allowed.exception';
import { PostEntity, PostType, ReferencedPost } from './post.entity';
import { Message } from './value-objects/message';

describe('post entity', () => {
  describe('normal post type', () => {
    it('should create a normal post when there is content on message', () => {
      const props = {
        type: PostType.NORMAL,
        message: 'My post content',
      };
      const sut = new PostEntity(props);

      expect(sut.id).toBeDefined();
      expect(sut.message).toBe(props.message);
      expect(sut.type).toBe(props.type);
    });

    it('should throw error when creating a normal post and there is no message', () => {
      const props = {
        type: PostType.NORMAL,
      };
      expect(() => new PostEntity(props)).toThrow(EmptyPostMessageException);
    });

    it('should throw error when creating a normal post and the message is empty', () => {
      const props = {
        type: PostType.NORMAL,
        message: '',
      };
      expect(() => new PostEntity(props)).toThrow(EmptyPostMessageException);
    });
  });

  describe('quote post type', () => {
    const referencedPost: ReferencedPost = {
      id: new ID('123'),
      message: new Message('Referenced post message.'),
      type: PostType.NORMAL,
      referencedPostId: new ID('321'),
    };

    it('should create a quote', () => {
      const props = {
        type: PostType.NORMAL,
        message: 'My post content',
        referencedPost,
      };
      const sut = new PostEntity(props);

      expect(sut.id).toBeDefined();
      expect(sut.message).toBe(props.message);
      expect(sut.type).toBe(props.type);
      expect(sut.referencedPost).toBe(referencedPost);
    });

    it('should throw error when creating a quote post and there is no message', () => {
      const props = {
        type: PostType.QUOTE,
        referencedPost,
      };
      expect(() => new PostEntity(props)).toThrow(EmptyPostMessageException);
    });

    it('should throw error when creating a quote post and the message is empty', () => {
      const props = {
        type: PostType.QUOTE,
        message: '',
        referencedPost,
      };
      expect(() => new PostEntity(props)).toThrow(EmptyPostMessageException);
    });

    it('should throw error when creating a quote post without a referenced post', () => {
      const props = {
        type: PostType.QUOTE,
        message: 'My comment.',
      };
      expect(() => new PostEntity(props)).toThrow(
        ReferencedPostNotFoundException,
      );
    });
  });

  describe('repost post type', () => {
    it('should create a repost when referenced post is normal', () => {
      const referencedPost: ReferencedPost = {
        id: new ID('123'),
        message: new Message('Referenced post message.'),
        type: PostType.NORMAL,
        referencedPostId: new ID('321'),
      };
      const props = {
        type: PostType.REPOST,
        referencedPost,
      };
      const sut = new PostEntity(props);

      expect(sut.id).toBeDefined();
      expect(sut.type).toBe(props.type);
      expect(sut.referencedPost).toBe(referencedPost);
    });

    it('should create a repost when referenced post is quote', () => {
      const referencedPost: ReferencedPost = {
        id: new ID('123'),
        message: new Message('Referenced post message.'),
        type: PostType.QUOTE,
        referencedPostId: new ID('321'),
      };
      const props = {
        type: PostType.REPOST,
        referencedPost,
      };
      const sut = new PostEntity(props);

      expect(sut.id).toBeDefined();
      expect(sut.type).toBe(props.type);
      expect(sut.referencedPost).toBe(referencedPost);
    });

    it('should throw error when creating a repost from a repost post', () => {
      const referencedPost: ReferencedPost = {
        id: new ID('123'),
        message: new Message('Referenced post message.'),
        type: PostType.REPOST,
        referencedPostId: new ID('321'),
      };
      const props = {
        type: PostType.REPOST,
        referencedPost,
      };
      expect(() => new PostEntity(props)).toThrow(
        RepostARepostNotAllowedException,
      );
    });

    it('should throw error when creating a repost without a referenced post', () => {
      const props = {
        type: PostType.REPOST,
        message: 'My comment.',
      };
      expect(() => new PostEntity(props)).toThrow(
        ReferencedPostNotFoundException,
      );
    });
  });
});
