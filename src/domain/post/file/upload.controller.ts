// src/domain/post/file/upload.controller.ts
import {
    Controller,
    Post,
    Body,
    UseGuards,
  } from '@nestjs/common';
  import { JwtAuthGuard } from '../../../common/guard/jwt-auth.guard';
  import { UploadService } from './upload.service';
  import { CreatePresignedUrlRequestDto } from '../dto/request/create-presigned-url.request.dto';
  import { CreatePresignedUrlResponseDto } from '../dto/response/create-presigned-url.response.dto';
  import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
  
  @ApiTags('Uploads')
  @ApiBearerAuth()
  @Controller('uploads')
  export class UploadController {
    constructor(private readonly uploadService: UploadService) {}
  
    @Post('presigned')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({
      summary: 'S3 Presigned URL 발급',
      description: 'S3에 직접 업로드할 수 있는 presigned URL을 발급합니다.',
    })
    async getPresignedUrl(
      @Body() dto: CreatePresignedUrlRequestDto,
    ): Promise<CreatePresignedUrlResponseDto> {
      return this.uploadService.getPresignedUrl(dto.originalName);
    }
  }
  