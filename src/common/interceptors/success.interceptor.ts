// common/interceptors/success.interceptor.ts

import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable, map } from 'rxjs';
  import { ResponseDTO } from '../dto/response.dto';
  
  @Injectable()
  export class SuccessInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(map((data) => ResponseDTO.okWithData(data)));
    }
  }
  