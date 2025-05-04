// src/domain/post/query/post.query.controller.ts

import { Controller, Get, Param, Req, UseGuards, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../../../common/guard/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiOkResponse,
} from '@nestjs/swagger';
import { PostQueryService } from './post.query.service';
import { PostDetailResponseDto } from '../../post/dto/response/post-detail.response.dto';
import { PostListResponseDto } from '../../post/dto/response/post-list.response.dto';
import { MyPostSummaryResponseDto } from '../../post/dto/response/my-post-summary.response.dto';

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
  async getPostDetail(
    @Param('id') id: string,
    @Req() req,
  ): Promise<PostDetailResponseDto> {
    return this.postQueryService.getPostDetail(+id, req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '게시글 전체 조회',
    description:
      '페이지네이션 기반으로 게시글 목록을 조회합니다. 최신순(latest)/인기순(popular) 정렬 가능.',
  })
  @ApiOkResponse({ type: PostListResponseDto })
  async getPosts(
    @Query('page') page: number = 1,
    @Query('size') size: number = 10,
    @Query('sort') sort: 'latest' | 'popular' = 'latest',
    @Req() req,
  ) {
    return this.postQueryService.getPosts({ page, size, sort }, req.user.id);
  }

  @Get('summary/me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '내 게시글 조회',
    description: '내가 작성한 게시글 목록을 조회합니다.',
  })
  @ApiOkResponse({ type: [MyPostSummaryResponseDto] })
  async getMyPosts(@Req() req): Promise<MyPostSummaryResponseDto[]> {
    return this.postQueryService.getMyPosts(req.user.id);
  }
}
