import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { BaseDomainException } from 'src/domain/base/base-domain-exception';
import { USER_SELF_FOLLOWING_NOT_PERMITTED_CODE } from 'src/domain/user-follow-link/exceptions/codes';

const BAD_REQUEST_EXCEPTION_CODES = [USER_SELF_FOLLOWING_NOT_PERMITTED_CODE];

@Catch(BaseDomainException)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: BaseDomainException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    if (BAD_REQUEST_EXCEPTION_CODES.includes(exception.code)) {
      status = HttpStatus.BAD_REQUEST;
    }

    response.status(status).json({
      code: exception.code,
      message: exception.message,
    });
  }
}
