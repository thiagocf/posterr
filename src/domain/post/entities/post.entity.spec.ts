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
    expect(normalValidateSpy).toBeCalledWith(
      undefined,
      new Message(props.message),
    );
  });

  it('should create a quote post', () => {
    const props = {
      type: PostType.QUOTE,
      message: 'My post content',
      authorId: 'abc',
      referencedPostId: 'ppp',
    };
    const sut = new PostEntity(props);

    expect(sut.id).toBeDefined();
    expect(sut.message).toBe(props.message);
    expect(sut.type).toBe(props.type);
    expect(sut.authorId).toBe(props.authorId);
    expect(sut.referencedPostId).toBe(props.referencedPostId);
    expect(sut.createdAt).toBeDefined();
    expect(quoteValidateSpy).toBeCalledTimes(1);
    expect(quoteValidateSpy).toBeCalledWith(
      new ID(props.referencedPostId),
      new Message(props.message),
    );
  });

  it('should create a repost post', () => {
    const props = {
      type: PostType.REPOST,
      authorId: 'abc',
      referencedPostId: 'ppp',
    };
    const sut = new PostEntity(props);

    expect(sut.id).toBeDefined();
    expect(sut.type).toBe(props.type);
    expect(sut.authorId).toBe(props.authorId);
    expect(sut.referencedPostId).toBe(props.referencedPostId);
    expect(sut.createdAt).toBeDefined();
    expect(repostValidateSpy).toBeCalledTimes(1);
    expect(repostValidateSpy).toBeCalledWith(
      new ID(props.referencedPostId),
      new Message(),
    );
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
