import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
  @ApiProperty({ example: 'hym@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'test@123' })
  @IsString()
  password: string;
}
