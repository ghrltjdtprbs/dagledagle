// src/domain/user/dto/request/update-my-info.request.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateMyInfoRequestDto {
  @ApiPropertyOptional({ description: '이름', example: '최혜미' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: '닉네임', example: 'hymhym' })
  @IsOptional()
  @IsString()
  nickname?: string;
}
