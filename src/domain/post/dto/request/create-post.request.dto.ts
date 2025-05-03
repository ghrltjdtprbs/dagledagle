import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreatePostRequestDto {
  @ApiProperty({ example: 'NestJS 게시글입니다.', description: '게시글 제목' })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'NestJS는 정말 좋습니다!',
    description: '게시글 본문',
  })
  @IsString()
  content: string;

  @ApiProperty({
    description: '첨부파일 정보 (mock)',
    required: false,
    example: [
      {
        fileName: 'abc123.png',
        originalName: '강의자료.png',
        fileUrl: 'https://bucket.s3.amazonaws.com/abc123.png',
      },
    ],
  })
  @IsOptional()
  @IsArray()
  attachments?: {
    fileName: string;
    originalName: string;
    fileUrl: string;
  }[];
}
