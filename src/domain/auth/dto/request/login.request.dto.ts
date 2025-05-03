import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
  @ApiProperty({
    description: '이메일 주소 (로그인 ID로 사용)',
    example: 'hym@example.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: '비밀번호',
    example: 'test@123',
    required: true,
  })
  @IsString()
  password: string;
}
