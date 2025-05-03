// src/domain/user/dto/response/user-profile.response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class UserProfileResponseDto {
  @ApiProperty({
    description: '유저 ID',
    example: 1,
    required: true,
  })
  id: number;

  @ApiProperty({
    description: '사용자 이름',
    example: '최혜미',
    required: true,
  })
  name: string;

  @ApiProperty({
    description: '사용자 닉네임',
    example: 'hymhym',
    required: true,
  })
  nickname: string;
}
