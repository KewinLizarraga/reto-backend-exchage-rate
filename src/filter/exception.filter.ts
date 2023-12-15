import { FastifyReply } from 'fastify';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  logger = new Logger(AllExceptionFilter.name);

  private static handleResponse(
    response: FastifyReply,
    exception: HttpException | Error,
  ): void {
    let responseBody: any = { message: 'Internal server error' };
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) {
      responseBody = exception.getResponse();
      statusCode = exception.getStatus();
    } else if (exception instanceof Error) {
      responseBody = {
        statusCode,
        message: exception.stack,
      };
    }

    response.status(statusCode).send(responseBody);
  }

  catch(exception: HttpException | Error, host: ArgumentsHost): void {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: FastifyReply = ctx.getResponse();

    this.handleMessage(exception);

    AllExceptionFilter.handleResponse(response, exception);
  }

  private handleMessage(exception: HttpException | Error): void {
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      message = JSON.stringify(exception.getResponse());
    } else if (exception instanceof Error) {
      message = exception.stack.toString();
    }

    this.logger.error(message);
  }
}
