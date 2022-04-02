import { Catch, HttpStatus } from '@nestjs/common';

import { BaseDomainException } from 'src/domain/base/base-domain-exception';
import { USER_SELF_FOLLOWING_NOT_PERMITTED_CODE } from 'src/domain/user-follow-link/exceptions/codes';
import { DomainExceptionFilter } from 'src/infra/common/filters/domain-exception.filter';

const BAD_REQUEST_EXCEPTION_CODES = [USER_SELF_FOLLOWING_NOT_PERMITTED_CODE];

@Catch(BaseDomainException)
export class UserFollowLinkDomainExceptionFilter extends DomainExceptionFilter {
  getStatus(exception: BaseDomainException): HttpStatus {
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    if (BAD_REQUEST_EXCEPTION_CODES.includes(exception.code)) {
      status = HttpStatus.BAD_REQUEST;
    }
    return status;
  }
}
