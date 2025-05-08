import { ApiProperty } from '@nestjs/swagger';

export class CreatePresignedUrlResponseDto {
  @ApiProperty({
    example: '0b32d35e-4c6f-467e-bf57-158ad3c9a1be.png',
    description: 'S3에 저장된 고유한 UUID 기반 파일명',
  })
  fileName: string;

  @ApiProperty({
    example: 'image.png',
    description: '사용자가 업로드한 원본 파일 이름',
  })
  originalName: string;

  @ApiProperty({
    example: 'https://media.dagledagle.store/uploads/0b32d35e-4c6f-...png',
    description: 'CloudFront 경유로 접근 가능한 파일 URL',
  })
  fileUrl: string;

  @ApiProperty({
    example: 'https://dagledagle-file.s3.ap-northeast-2.amazonaws.com/uploads/...',
    description: 'S3에 직접 PUT 요청할 수 있는 presigned URL',
  })
  presignedUrl: string;
}
