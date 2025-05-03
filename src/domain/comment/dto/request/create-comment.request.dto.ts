import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCommentRequestDto {
  @ApiProperty({ description: '댓글 내용', example: '좋은 글이네요!' })
  @IsString()
  content: string;

  @ApiProperty({
    description: '부모 댓글 ID (대댓글인 경우)',
    required: false,
    example: 5,
  })
  @IsOptional()
  @IsNumber()
  parentCommentId?: number;
}
