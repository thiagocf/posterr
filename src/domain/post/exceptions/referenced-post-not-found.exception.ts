import { BaseException } from 'src/domain/base/base-exception';

export class ReferencedPostNotFoundException extends BaseException {
  constructor() {
    super('Referenced post not found.', 'ReferencedPostNotFoundException');
  }
}
