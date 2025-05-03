import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignupRequestDto {
  @ApiProperty({
    description: '이메일 주소 (로그인 ID로 사용)',
    example: 'hym@example.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: '회원 이름',
    example: '최혜미',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: '닉네임 (유니크)',
    example: 'hymhym',
    required: true,
  })
  @IsString()
  nickname: string;

  @ApiProperty({
    description: '비밀번호 (암호화되어 저장됨)',
    example: 'test@123',
    required: true,
  })
  @IsString()
  password: string;
}
