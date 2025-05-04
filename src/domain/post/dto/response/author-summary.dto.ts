// src/domain/post/dto/response/author-summary.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class AuthorSummaryDto {
  @ApiProperty({ example: 1, description: '작성자 ID' })
  id: number;

  @ApiProperty({ example: '최혜미', description: '작성자 닉네임' })
  nickname: string;
}
