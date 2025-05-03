// src/common/filter/global-exception.filter.ts

import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseDTO } from '../dto/response.dto';
import { ApplicationException } from '../exception/application.exception';
import { QueryFailedError } from 'typeorm';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    // 커스텀 도메인 예외 처리
    if (exception instanceof ApplicationException) {
      return res
        .status(exception.status)
        .json(ResponseDTO.error(exception.status, exception.message));
    }

    // TypeORM 쿼리 실패 (ex: unique 제약 위반, syntax 오류 등)
    if (exception instanceof QueryFailedError) {
      const message = '데이터베이스 오류가 발생했습니다.';
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(ResponseDTO.error(HttpStatus.INTERNAL_SERVER_ERROR, message));
    }

    // Nest 내장 HttpException (BadRequestException 등)
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const resBody: any = exception.getResponse();
      const message =
        typeof resBody === 'string'
          ? resBody
          : resBody?.message || '요청이 잘못되었습니다.';
      return res.status(status).json(ResponseDTO.error(status, message));
    }

    // 그 외 런타임 에러
    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const message = (exception as any)?.message || '서버 오류가 발생했습니다.';
    return res.status(status).json(ResponseDTO.error(status, message));
  }
}
