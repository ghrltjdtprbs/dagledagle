import { ApiProperty } from '@nestjs/swagger';

export class SignupRequestDto {
  @ApiProperty({
    description: '이메일 주소 (로그인 ID로 사용)',
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
    description: '닉네임 (유니크)',
    example: 'hymhym',
    required: true,
  })
  nickname: string;

  @ApiProperty({
    description: '비밀번호 (암호화되어 저장됨)',
    example: 'test@123',
    required: true,
  })
  password: string;
}
