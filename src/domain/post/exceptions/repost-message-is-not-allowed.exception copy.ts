import { BaseDomainException } from 'src/domain/base/base-domain-exception';
import { REPOST_MESSAGE_IS_NOT_ALLOWED_CODE } from './codes';

export class RepostMessageIsNotAllowedException extends BaseDomainException {
  constructor() {
    super('Repost message is not allowed.', REPOST_MESSAGE_IS_NOT_ALLOWED_CODE);
  }
}
