import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdatePostRequestDto {
  @ApiProperty({ description: '수정할 제목', example: '수정된 제목입니다.' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ description: '수정할 내용', example: '수정된 본문입니다.' })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({
    description: '첨부파일 전체 교체 (기존 전부 삭제 후 추가)',
    required: false,
    example: [
      {
        fileName: 'newFile.png',
        originalName: '새파일.png',
        fileUrl: 'https://bucket.s3.amazonaws.com/newFile.png',
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
