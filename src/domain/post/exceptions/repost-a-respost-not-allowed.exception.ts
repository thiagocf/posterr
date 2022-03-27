import { BaseException } from 'src/domain/base/base-exception';

export class RepostARepostNotAllowedException extends BaseException {
  constructor() {
    super(
      'Repost a respost is not allowed.',
      'RepostARepostNotAllowedException',
    );
  }
}
