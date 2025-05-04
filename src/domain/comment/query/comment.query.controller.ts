// src/domain/comment/query/comment.query.controller.ts
import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../../../common/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { CommentQueryService } from './comment.query.service';
import { CommentMyResponseDto } from '../../comment/dto/response/comment-my.response.dto';

@ApiTags('Comments')
@ApiBearerAuth()
@Controller('comments')
export class CommentQueryController {
  constructor(private readonly commentQueryService: CommentQueryService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '내가 작성한 댓글 조회', description: '내가 작성한 댓글 목록을 조회합니다.' })
  @ApiOkResponse({ type: [CommentMyResponseDto] })
  async getMyComments(@Req() req): Promise<CommentMyResponseDto[]> {
    return this.commentQueryService.getMyComments(req.user.id);
  }
}
