import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

interface CustomException extends QueryFailedError {
  code: string;
}

@Catch(QueryFailedError)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: CustomException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    console.log(exception);
    if (exception.code === '23505') {
      response.json({
        statusCode: 400,
        timestamp: new Date().toISOString(),
        path: request.url,
        error: 'User already exists',
        message: 'User already exists',
      });
    }
  }
}
