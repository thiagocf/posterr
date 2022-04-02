import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { BaseDomainException } from 'src/domain/base/base-domain-exception';
import * as PostExceptionCode from 'src/domain/post/exceptions/codes';

const BAD_REQUEST_EXCEPTION_CODES = [
  PostExceptionCode.EMPTY_POST_MESSAGE_CODE,
  PostExceptionCode.INVALID_POST_MESSAGE_LENGTH_CODE,
  PostExceptionCode.REFERENCED_POST_NOT_FOUND_CODE,
  PostExceptionCode.REPOST_MESSAGE_IS_NOT_ALLOWED_CODE,
  PostExceptionCode.REPOSTING_A_REPOST_NOT_ALLOWED_CODE,
  PostExceptionCode.POSTS_LIMIT_EXCEEDED_CODE,
];

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
