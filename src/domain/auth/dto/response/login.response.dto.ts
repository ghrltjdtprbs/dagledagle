import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    description: '액세스토큰',
    example: 'eyJhbGciOiJIU...',
    required: true,
  })
  accessToken: string;

  @ApiProperty({
    description: '리프레쉬 토큰',
    example: 'eyJhbGciOiJIU...',
    required: true,
  })
  refreshToken: string;
}
