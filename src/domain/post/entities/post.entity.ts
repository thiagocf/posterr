import { ID } from 'src/domain/base/value-objects/id';
import { EmptyPostMessageException } from '../exceptions/empty-post-message.exception';
import { ReferencedPostNotFoundException } from '../exceptions/referenced-post-not-found.exception';
import { RepostARepostNotAllowedException } from '../exceptions/repost-a-respost-not-allowed.exception';
import { Message } from './value-objects/message';

export enum PostType {
  NORMAL,
  REPOST,
  QUOTE,
}

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
  referencedPostId: ID;
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

    this.validate();
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

  private validate() {
    if (
      [PostType.QUOTE, PostType.REPOST].includes(this._type) &&
      !this._referencedPost
    ) {
      throw new ReferencedPostNotFoundException();
    }

    if (
      [PostType.NORMAL, PostType.QUOTE].includes(this._type) &&
      this._message.value === ''
    ) {
      throw new EmptyPostMessageException();
    }

    if (
      this._type === PostType.REPOST &&
      this._referencedPost.type === PostType.REPOST
    ) {
      throw new RepostARepostNotAllowedException();
    }
  }
}
