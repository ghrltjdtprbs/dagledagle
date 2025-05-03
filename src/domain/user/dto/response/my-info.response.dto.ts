// src/domain/user/dto/response/my-info.response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class MyInfoResponseDto {
  @ApiProperty({ description: '유저 ID', example: 1 })
  id: number;

  @ApiProperty({ description: '이메일', example: 'hym@example.com' })
  email: string;

  @ApiProperty({ description: '이름', example: '최혜미' })
  name: string;

  @ApiProperty({ description: '닉네임', example: 'hymhym' })
  nickname: string;
}
