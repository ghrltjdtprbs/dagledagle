// src/domain/post/dto/response/post-detail.response.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { AuthorSummaryDto } from './author-summary.dto';
import { PostAttachmentDto } from './post-attachment.dto';
import { CommentResponseDto } from '../../../comment/dto/response/comment.response.dto';

export class PostDetailResponseDto {
  @ApiProperty({ example: 1, description: '게시글 ID' })
  id: number;

  @ApiProperty({ example: '게시글 제목', description: '게시글 제목' })
  title: string;

  @ApiProperty({ example: '게시글 내용입니다.', description: '게시글 본문' })
  content: string;

  @ApiProperty({
    description: '게시글 작성자 정보',
    type: AuthorSummaryDto,
  })
  author: AuthorSummaryDto;

  @ApiProperty({ example: 123, description: '게시글 조회수' })
  viewCount: number;

  @ApiProperty({ example: 12, description: '좋아요 수' })
  likeCount: number;

  @ApiProperty({ example: 5, description: '댓글 수' })
  commentCount: number;

  @ApiProperty({
    example: true,
    description: '로그인한 사용자가 좋아요 눌렀는지 여부',
  })
  isLiked: boolean;

  @ApiProperty({
    description: '첨부파일 목록',
    type: [PostAttachmentDto],
  })
  attachments: PostAttachmentDto[];

  @ApiProperty({
    description: '댓글 목록',
    type: [CommentResponseDto],
  })
  comments: CommentResponseDto[];
}
