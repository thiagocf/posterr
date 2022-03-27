import { BaseException } from 'src/domain/base/base-exception';

export class EmptyPostMessageException extends BaseException {
  constructor() {
    super('Empty post message.', 'EmptyPostMessageException');
  }
}
