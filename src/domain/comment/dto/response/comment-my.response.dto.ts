// src/domain/comment/dto/response/comment-my.response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CommentMyResponseDto {
  @ApiProperty({ example: 10, description: '댓글 ID' })
  id: number;

  @ApiProperty({ example: '가보자고!', description: '댓글 내용' })
  content: string;

  @ApiProperty({
    example: '2024-05-04T14:12:30.000Z',
    description: '댓글 작성일시',
  })
  createdAt: Date;
}
