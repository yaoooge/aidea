import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const raw = exception.getResponse();
      const message =
        typeof raw === 'string'
          ? raw
          : typeof raw === 'object' && raw !== null && 'message' in raw
            ? String((raw as { message: unknown }).message)
            : exception.message;
      const code =
        typeof raw === 'object' && raw !== null && 'code' in raw
          ? String((raw as { code: unknown }).code)
          : status === HttpStatus.UNAUTHORIZED
            ? 'UNAUTHORIZED'
            : status === HttpStatus.NOT_FOUND
              ? 'NOT_FOUND'
              : status === HttpStatus.CONFLICT
                ? 'CONFLICT'
                : status === HttpStatus.BAD_REQUEST
                  ? 'BAD_REQUEST'
                  : 'HTTP_ERROR';

      res.status(status).json({
        code,
        message: Array.isArray(message) ? message.join('; ') : message,
        data: null,
      });
      return;
    }

    this.logger.error(exception);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      code: 'INTERNAL_ERROR',
      message: '服务器内部错误',
      data: null,
    });
  }
}
