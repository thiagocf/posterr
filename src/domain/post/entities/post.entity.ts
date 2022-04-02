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
  authorId: string;
  createdAt?: Date;
  referencedPostId?: string;
};

export type ReferencedPost = {
  id: string;
  message: string;
  type: PostType;
  authorId: string;
  createdAt: Date;
  referencedPostId?: string;
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
  private readonly _authorId: ID;
  private readonly _createdAt: Date;
  private readonly _referencedPostId: ID;

  constructor(props: PostEntityProps) {
    this._id = new ID(props.id);
    this._message = new Message(props.message);
    this._type = props.type;
    this._authorId = new ID(props.authorId);
    this._createdAt = props?.createdAt || new Date();

    if (props.referencedPostId)
      this._referencedPostId = new ID(props.referencedPostId);

    const Validator = ValidatorStrategyMap[props.type];
    const validator = new Validator();
    validator.validate(this._referencedPostId, this._message);
  }

  get id(): string {
    return this._id.value;
  }

  get message(): string {
    return this._message?.value;
  }

  get type(): PostType {
    return this._type;
  }

  get authorId(): string {
    return this._authorId.value;
  }

  get referencedPostId(): string {
    return this._referencedPostId?.value;
  }

  get createdAt(): Date {
    return this._createdAt;
  }
}
