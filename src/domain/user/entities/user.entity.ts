import { Username } from './username';

type UserEntityProps = {
  id: string;
  username: string;
  createdAt: Date;
};

export class UserEntity {
  private readonly _username: Username;

  constructor(private readonly props: UserEntityProps) {
    this._username = new Username(props.username);
  }

  get username() {
    return this._username.value;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get id() {
    return this.props.id;
  }
}
