import { ID } from 'src/domain/base/value-objects/id';
import { PostType } from './post-type';
import { NormalValidatorStrategy } from './validator-strategies/normal-validator-strategy';
import { QuoteValidatorStrategy } from './validator-strategies/quote-validator-strategy';
import { RepostValidatorStrategy } from './validator-strategies/repost-validator-strategy';
import { Message } from './value-objects/message';

type PostEntityProps = {
  id?: string;
  message?: string;
  type: PostType;
  referencedPost?: ReferencedPost;
};

export type ReferencedPost = {
  id: ID;
  message: Message;
  type: PostType;
  referencedPostId?: ID;
};

const ValidatorStrategyMap = {
  [PostType.NORMAL]: NormalValidatorStrategy,
  [PostType.QUOTE]: QuoteValidatorStrategy,
  [PostType.REPOST]: RepostValidatorStrategy,
};
export class PostEntity {
  private readonly _id: ID;
  private readonly _message: Message;
  private readonly _type: PostType;
  private readonly _referencedPost: ReferencedPost;

  constructor(props: PostEntityProps) {
    this._id = new ID(props.id);
    this._message = new Message(props.message);
    this._type = props.type;
    this._referencedPost = props.referencedPost;

    const validator = new ValidatorStrategyMap[props.type]();
    validator.validate(props.referencedPost, this.message);
  }

  get id() {
    return this._id.value;
  }

  get message() {
    return this._message.value;
  }

  get type() {
    return this._type;
  }

  get referencedPost() {
    return this._referencedPost;
  }
}
