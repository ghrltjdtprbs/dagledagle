// src/common/dto/response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class ResponseDTO<T> {
  @ApiProperty({ description: '응답 코드', example: 200 })
  code: number;

  @ApiProperty({ description: '응답 메시지', example: '요청이 성공했습니다.', nullable: true })
  message: string | null;

  @ApiProperty({ description: '응답 데이터', nullable: true })
  data: T | null;

  constructor(code: number, message: string | null, data: T | null) {
    this.code = code;
    this.message = message;
    this.data = data;
  }

  static ok(): ResponseDTO<void> {
    return new ResponseDTO(200, null, null);
  }

  static okWithData<T>(data: T): ResponseDTO<T> {
    return new ResponseDTO(200, null, data);
  }

  static okWithMessageAndData<T>(message: string, data: T): ResponseDTO<T> {
    return new ResponseDTO(200, message, data);
  }

  static error(code: number, message: string): ResponseDTO<void> {
    return new ResponseDTO(code, message, null);
  }
}
