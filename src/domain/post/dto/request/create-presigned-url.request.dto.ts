import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

export class CreatePresignedUrlRequestDto {
  @ApiProperty({
    example: 'image.png',
    description: '사용자가 업로드한 원본 파일 이름 (확장자 포함)',
  })
  @IsString()
  @Matches(/\.(jpg|jpeg|png|gif|webp|pdf|docx?)$/i, {
    message: '지원하지 않는 파일 확장자입니다.',
  })
  originalName: string;
}
