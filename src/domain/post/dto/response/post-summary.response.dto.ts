// src/domain/post/dto/response/post-summary.response.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { AuthorSummaryDto } from './author-summary.dto';

export class PostSummaryResponseDto {
  @ApiProperty({ example: 1, description: '게시글 ID' })
  id: number;

  @ApiProperty({ example: '게시글 제목입니다.', description: '게시글 제목' })
  title: string;

  @ApiProperty({
    description: '작성자 정보',
    type: () => AuthorSummaryDto,
  })
  author: AuthorSummaryDto;

  @ApiProperty({ example: 123, description: '조회 수' })
  viewCount: number;

  @ApiProperty({ example: 25, description: '좋아요 수' })
  likeCount: number;

  @ApiProperty({ example: 10, description: '댓글 수' })
  commentCount: number;

  @ApiProperty({
    example: true,
    description: '현재 사용자가 해당 게시글에 좋아요를 눌렀는지 여부',
  })
  isLiked: boolean;
}
