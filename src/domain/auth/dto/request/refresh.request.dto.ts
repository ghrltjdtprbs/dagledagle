// src/domain/auth/dto/request/refresh.request.dto.ts
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshRequestDto {
  @ApiProperty({ example: 'refresh_token_here' })
  @IsString()
  refreshToken: string;
}
