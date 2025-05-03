// src/domain/user/command/user.command.controller.ts

import { Controller, Post, Body, Delete, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../../../common/guard/jwt-auth.guard';
import { UserCommandService } from './user.command.service';
import { SignupRequestDto } from '../../user/dto/signup.request.dto';
import { SignupResponseDto } from '../../user/dto/signup.response.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserCommandController {
  constructor(private readonly userCommandService: UserCommandService) {}

  @Post()
  @ApiOperation({
    summary: '회원가입',
    description: '새로운 사용자를 등록합니다.',
  })
  async createUser(@Body() dto: SignupRequestDto): Promise<SignupResponseDto> {
    const user = await this.userCommandService.createUser(dto);
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      nickname: user.nickname,
    };
  }

  @Delete('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: '회원 탈퇴',
    description: '로그인한 사용자의 계정을 탈퇴(soft delete)합니다.',
  })
  async deleteUser(@Req() req): Promise<string> {
    await this.userCommandService.softDelete(req.user.id);
    return '회원 탈퇴 완료';
  }
}
