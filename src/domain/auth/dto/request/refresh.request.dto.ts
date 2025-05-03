// src/domain/auth/dto/request/refresh.request.dto.ts
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshRequestDto {
  @ApiProperty({
    description: '리프레쉬 토큰',
    example: 'eyJhbGciOiJIUzI1N...',
    required: true,
  })
  @IsString()
  refreshToken: string;
}
