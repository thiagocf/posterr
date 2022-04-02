import { ExceptionFilter, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { BaseDomainException } from 'src/domain/base/base-domain-exception';

export abstract class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: BaseDomainException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(this.getStatus(exception)).json({
      code: exception.code,
      message: exception.message,
    });
  }

  abstract getStatus(exception: BaseDomainException): HttpStatus;
}
