import { BaseDomainException } from 'src/domain/base/base-domain-exception';
import { REPOSTING_A_REPOST_NOT_ALLOWED_CODE } from './codes';

export class RepostingARepostNotAllowedException extends BaseDomainException {
  constructor() {
    super(
      'Reposting a respost is not allowed.',
      REPOSTING_A_REPOST_NOT_ALLOWED_CODE,
    );
  }
}
