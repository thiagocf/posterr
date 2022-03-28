import { ID } from 'src/domain/base/value-objects/id';
import { Username } from './value-objects/username';

export type UserEntityProps = {
  id?: string;
  username: string;
  createdAt?: Date;
  followersCount?: number;
  followingCount?: number;
  postsCount?: number;
};

export class UserEntity {
  private readonly _username: Username;
  private readonly _id: ID;
  private readonly _followersCount: number;
  private readonly _followingCount: number;
  private readonly _postsCount: number;
  private readonly _createdAt: Date;

  constructor(private readonly props: UserEntityProps) {
    this._username = new Username(props.username);
    this._id = new ID(props.id);
    this._followersCount = props.followersCount || 0;
    this._followingCount = props.followingCount || 0;
    this._postsCount = props.postsCount || 0;
    this._createdAt = props.createdAt || new Date();
  }

  get username() {
    return this._username.value;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get id() {
    return this._id.value;
  }

  get followersCount() {
    return this._followersCount;
  }

  get followingCount() {
    return this._followingCount;
  }

  get postsCount() {
    return this._postsCount;
  }

  get createAt() {
    return this._createdAt;
  }
}
