import { ID } from 'src/domain/base/value-objects/id';
import { PostType } from './post-type';
import { PostEntity, ReferencedPost } from './post.entity';
import { NormalValidatorStrategy } from './validator-strategies/normal-validator-strategy';
import { QuoteValidatorStrategy } from './validator-strategies/quote-validator-strategy';
import { RepostValidatorStrategy } from './validator-strategies/repost-validator-strategy';
import { Message } from './value-objects/message';

describe('post entity', () => {
  const normalValidateSpy = jest.spyOn(
    NormalValidatorStrategy.prototype,
    'validate',
  );
  const quoteValidateSpy = jest.spyOn(
    QuoteValidatorStrategy.prototype,
    'validate',
  );
  const repostValidateSpy = jest.spyOn(
    RepostValidatorStrategy.prototype,
    'validate',
  );

  it('should create a normal post', () => {
    const props = {
      type: PostType.NORMAL,
      message: 'My post content',
      authorId: 'abc',
    };
    const sut = new PostEntity(props);

    expect(sut.id).toBeDefined();
    expect(sut.message).toBe(props.message);
    expect(sut.type).toBe(props.type);
    expect(sut.authorId).toBe(props.authorId);
    expect(sut.createdAt).toBeDefined();
    expect(normalValidateSpy).toBeCalledTimes(1);
    expect(normalValidateSpy).toBeCalledWith(undefined, props.message);
  });

  it('should create a quote post', () => {
    const referencedPost: ReferencedPost = {
      id: new ID('123'),
      message: new Message('Referenced post message.'),
      type: PostType.NORMAL,
      createdAt: new Date(),
      authorId: new ID('abc'),
    };
    const props = {
      type: PostType.QUOTE,
      message: 'My post content',
      authorId: 'abc',
      referencedPost,
    };
    const sut = new PostEntity(props);

    expect(sut.id).toBeDefined();
    expect(sut.message).toBe(props.message);
    expect(sut.type).toBe(props.type);
    expect(sut.authorId).toBe(props.authorId);
    expect(sut.referencedPost).toBe(referencedPost);
    expect(sut.createdAt).toBeDefined();
    expect(quoteValidateSpy).toBeCalledTimes(1);
    expect(quoteValidateSpy).toBeCalledWith(referencedPost, props.message);
  });

  it('should create a repost post', () => {
    const referencedPost: ReferencedPost = {
      id: new ID('123'),
      message: new Message('Referenced post message.'),
      authorId: new ID('abc'),
      createdAt: new Date(),
      type: PostType.NORMAL,
    };
    const props = {
      type: PostType.REPOST,
      authorId: 'abc',
      referencedPost,
    };
    const sut = new PostEntity(props);

    expect(sut.id).toBeDefined();
    expect(sut.type).toBe(props.type);
    expect(sut.authorId).toBe(props.authorId);
    expect(sut.referencedPost).toBe(referencedPost);
    expect(sut.createdAt).toBeDefined();
    expect(repostValidateSpy).toBeCalledTimes(1);
    expect(repostValidateSpy).toBeCalledWith(referencedPost, '');
  });

  it('should create a post when created at is provided', () => {
    const props = {
      type: PostType.NORMAL,
      message: 'My post content',
      authorId: 'abc',
      createdAt: new Date(),
    };
    const sut = new PostEntity(props);
    expect(sut.createdAt).toBe(props.createdAt);
  });

  it('should throw exceptions throwed by validator', () => {
    normalValidateSpy.mockImplementation(() => {
      throw new Error('test error');
    });
    const props = {
      type: PostType.NORMAL,
      message: 'My post content',
      authorId: 'abc',
    };
    expect(() => new PostEntity(props)).toThrow('test error');
  });
});
