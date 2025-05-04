// src/domain/post/dto/response/my-post-summary.response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class MyPostSummaryResponseDto {
  @ApiProperty({ example: 1, description: '게시글 ID' })
  id: number;

  @ApiProperty({ example: '내가 쓴 글', description: '게시글 제목' })
  title: string;

  @ApiProperty({ example: 12, description: '좋아요 수' })
  likeCount: number;

  @ApiProperty({ example: 5, description: '댓글 수' })
  commentCount: number;

  @ApiProperty({ example: 34, description: '조회 수' })
  viewCount: number;

  @ApiProperty({
    description: '작성일 (ISO 형식)',
    example: '2024-12-25T14:30:00.000Z',
  })
  createdAt: Date;
}
