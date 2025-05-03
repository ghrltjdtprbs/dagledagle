// src/domain/comment/dto/response/comment.response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CommentResponseDto {
  @ApiProperty({ example: 1, description: '댓글 ID' })
  id: number;

  @ApiProperty({ example: '삭제된 댓글입니다.', description: '댓글 내용' })
  content: string;

  @ApiProperty({
    description: '댓글 작성자 정보',
    type: () => Object,
    example: { id: 5, nickname: '닉네임짱' },
  })
  author: {
    id: number;
    nickname: string;
  };

  @ApiProperty({
    description: '대댓글 목록',
    type: () => [CommentResponseDto],
  })
  children: CommentResponseDto[];
}
