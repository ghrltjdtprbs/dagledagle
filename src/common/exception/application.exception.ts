// src/common/exception/application.exception.ts
import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from './error-code.enum';

const errorStatusMap: Record<ErrorCode, HttpStatus> = {
  [ErrorCode.DUPLICATE_EMAIL]: HttpStatus.CONFLICT,
  [ErrorCode.USER_NOT_FOUND]: HttpStatus.NOT_FOUND,
  [ErrorCode.PASSWORD_MISMATCH]: HttpStatus.BAD_REQUEST,
};

export class ApplicationException extends Error {
  readonly code: ErrorCode;
  readonly status: HttpStatus;

  constructor(code: ErrorCode) {
    super(code);
    this.code = code;
    this.status = errorStatusMap[code] || HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
