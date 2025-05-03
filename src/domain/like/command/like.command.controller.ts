// src/domain/likr/command/like.command.controller.ts
import { Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../common/guard/jwt-auth.guard';
import { LikeCommandService } from './like.command.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Likes')
@ApiBearerAuth()
@Controller('posts/:postId/like')
export class LikeCommandController {
  constructor(private readonly likeService: LikeCommandService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '좋아요 토글',
    description: '좋아요가 없으면 추가, 있으면 취소합니다.',
  })
  async toggleLike(
    @Req() req,
    @Param('postId') postId: string,
  ): Promise<string> {
    const liked = await this.likeService.toggle(+postId, req.user.id);
    return liked ? '좋아요 추가' : '좋아요 취소';
  }
}
