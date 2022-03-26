import { BaseException } from 'src/domain/base/base-exception';

export class InvalidUsernameLengthException extends BaseException {
  constructor() {
    super('Invalid username length.', 'InvalidUsernameLengthException');
  }
}
