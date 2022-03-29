import { BaseException } from 'src/domain/base/base-exception';

export class RepostingARepostNotAllowedException extends BaseException {
  constructor() {
    super(
      'Reposting a respost is not allowed.',
      'RepostingARepostNotAllowedException',
    );
  }
}
