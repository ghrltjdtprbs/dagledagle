// src/domain/user/command/user.command.controller.ts

import {
  Controller,
  Post,
  Body,
  Delete,
  Patch,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../../common/guard/jwt-auth.guard';
import { UserCommandService } from './user.command.service';
import { SignupRequestDto } from '../dto/request/signup.request.dto';
import { SignupResponseDto } from '../dto/response/signup.response.dto';
import { UpdateMyInfoRequestDto } from '../dto/request/update-my-info.request.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UpdatePasswordRequestDto } from '../dto/request/update-password.request.dto';

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

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: '내 정보 수정',
    description: '이메일을 제외한 이름, 닉네임만 수정할 수 있습니다.',
  })
  async updateUser(
    @Req() req,
    @Body() dto: UpdateMyInfoRequestDto,
  ): Promise<string> {
    await this.userCommandService.updateUser(req.user.id, dto);
    return '회원 정보 수정 완료';
  }

  @Patch('me/password')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: '비밀번호 수정',
    description: '현재 비밀번호를 확인하고, 새 비밀번호로 변경합니다.',
  })
  async updatePassword(
    @Req() req,
    @Body() dto: UpdatePasswordRequestDto,
  ): Promise<string> {
    await this.userCommandService.updatePassword(req.user.id, dto);
    return '비밀번호 수정 완료';
  }
}
