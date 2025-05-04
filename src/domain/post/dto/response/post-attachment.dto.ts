// src/domain/post/dto/response/post-attachment.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class PostAttachmentDto {
  @ApiProperty({ example: 'abc123.png', description: 'S3 저장 파일명' })
  fileName: string;

  @ApiProperty({
    example: '강의자료.png',
    description: '사용자가 업로드한 파일명',
  })
  originalName: string;

  @ApiProperty({
    example: 'https://bucket.s3.amazonaws.com/abc123.png',
    description: '파일 URL',
  })
  fileUrl: string;
}
