// src/domain/post/command/post.command.controller.ts
import { Body, Controller, Post, UseGuards, Req, Patch, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../../../common/guard/jwt-auth.guard';
import { PostCommandService } from './post.command.service';
import { CreatePostRequestDto } from '../../post/dto/request/create-post.request.dto';
import { UpdatePostRequestDto } from '../../post/dto/request/update-post.request.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Posts')
@ApiBearerAuth()
@Controller('posts')
export class PostCommandController {
  constructor(private readonly postCommandService: PostCommandService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '게시글 작성', description: '게시글을 등록합니다.' })
  async createPost(@Req() req, @Body() dto: CreatePostRequestDto) {
    await this.postCommandService.createPost(req.user.id, dto);
    return '게시글 등록 완료';
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: '게시글 수정',
    description: '자신이 작성한 게시글을 수정합니다.',
  })
  async updatePost(
    @Req() req,
    @Param('id') postId: string,
    @Body() dto: UpdatePostRequestDto,
  ) {
    await this.postCommandService.updatePost(+postId, req.user.id, dto);
    return '게시글 수정 완료';
  }
}
