import {
  Body,
  Controller,
  Param,
  Post,
  Req,
  UseGuards,
  Delete,
  Patch,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../../common/guard/jwt-auth.guard';
import { CreateCommentRequestDto } from '../../comment/dto/request/create-comment.request.dto';
import { UpdateCommentRequestDto } from '../../comment/dto/request/update-comment.request.dto';
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
    description:
      '게시글에 댓글 또는 대댓글을 작성합니다. 대댓글은 1단까지만 가능합니다.',
  })
  async createComment(
    @Req() req,
    @Param('postId') postId: string,
    @Body() dto: CreateCommentRequestDto,
  ): Promise<string> {
    await this.commentCommandService.createComment(req.user.id, +postId, dto);
    return '댓글 작성 완료';
  }

  @Delete('/:commentId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: '댓글 삭제',
    description: '자신이 작성한 댓글을 삭제합니다.',
  })
  async deleteComment(
    @Req() req,
    @Param('commentId') commentId: string,
  ): Promise<string> {
    await this.commentCommandService.softDelete(+commentId, req.user.id);
    return '댓글 삭제 완료';
  }

  @Patch('/:commentId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: '댓글 수정',
    description: '자신이 작성한 댓글 내용을 수정합니다.',
  })
  async updateComment(
    @Req() req,
    @Param('commentId') commentId: string,
    @Body() dto: UpdateCommentRequestDto,
  ): Promise<string> {
    await this.commentCommandService.update(+commentId, req.user.id, dto);
    return '댓글 수정 완료';
  }
}
