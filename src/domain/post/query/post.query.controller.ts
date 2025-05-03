// src/domain/post/query/post.query.controller.ts

import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../common/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PostQueryService } from './post.query.service';
import { PostDetailResponseDto } from '../../post/dto/response/post-detail.response.dto';

@ApiTags('Posts')
@ApiBearerAuth()
@Controller('posts')
export class PostQueryController {
  constructor(private readonly postQueryService: PostQueryService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '게시글 상세 조회',
    description: '게시글 상세 정보, 댓글, 좋아요 여부까지 포함해서 조회합니다.',
  })
  async getPostDetail(@Param('id') id: string, @Req() req): Promise<PostDetailResponseDto> {
    return this.postQueryService.getPostDetail(+id, req.user.id);
  }
}
