// src/domain/user/dto/request/update-password.request.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdatePasswordRequestDto {
  @ApiProperty({ description: '현재 비밀번호', example: 'oldpass123' })
  @IsString()
  currentPassword: string;

  @ApiProperty({ description: '새 비밀번호', example: 'newpass456' })
  @IsString()
  newPassword: string;
}
