import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../common/guard/jwt-auth.guard';
import { CreateCommentRequestDto } from '../../comment/dto/request/create-comment.request.dto';
import { CommentCommandService } from './comment.command.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Comments')
@ApiBearerAuth()
@Controller('posts/:postId/comments')
export class CommentCommandController {
  constructor(private readonly commentCommandService: CommentCommandService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '댓글 작성',
    description: '게시글에 댓글 또는 대댓글을 작성합니다.',
  })
  async createComment(
    @Req() req,
    @Param('postId') postId: string,
    @Body() dto: CreateCommentRequestDto,
  ): Promise<string> {
    await this.commentCommandService.createComment(req.user.id, +postId, dto);
    return '댓글 작성 완료';
  }
}
