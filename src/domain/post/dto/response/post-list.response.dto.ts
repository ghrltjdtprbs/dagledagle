// src/domain/post/dto/response/post-list.response.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { PostSummaryResponseDto } from './post-summary.response.dto';

export class PostListResponseDto {
  @ApiProperty({ type: [PostSummaryResponseDto], description: '게시글 목록' })
  items: PostSummaryResponseDto[];

  @ApiProperty({ example: 1, description: '현재 페이지 번호' })
  page: number;

  @ApiProperty({ example: 10, description: '페이지당 항목 수' })
  size: number;

  @ApiProperty({ example: 57, description: '전체 게시글 수' })
  totalCount: number;

  @ApiProperty({ example: 6, description: '전체 페이지 수' })
  totalPages: number;
}
