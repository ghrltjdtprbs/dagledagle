// src/common/filter/global-exception.filter.ts
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { Response } from 'express';
  import { ResponseDTO } from '../dto/response.dto';
  
  @Catch()
  export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const res = ctx.getResponse<Response>();
  
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = '서버 오류가 발생했습니다.';
  
      if (exception instanceof HttpException) {
        status = exception.getStatus();
        const response = exception.getResponse();
        if (typeof response === 'object' && response['message']) {
          message = (response as any).message;
        }
      } else if (exception instanceof Error) {
        message = exception.message;
      }
  
      res.status(status).json(ResponseDTO.error(status, message));
    }
  }
  