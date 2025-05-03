import { ApiProperty } from '@nestjs/swagger';

export class SignupResponseDto {
  @ApiProperty({
    description: 'userId',
    example: 1,
    required: true,
  })
  id: number;

  @ApiProperty({
    description: '이메일 주소',
    example: 'hym@example.com',
    required: true,
  })
  email: string;

  @ApiProperty({
    description: '회원 이름',
    example: '최혜미',
    required: true,
  })
  name: string;

  @ApiProperty({
    description: '닉네임',
    example: 'hymhym',
    required: true,
  })
  nickname: string;
}
