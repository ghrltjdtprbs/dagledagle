// src/domain/user/command/user.command.controller.ts

import { Body, Controller, Post } from '@nestjs/common';
import { UserCommandService } from './user.command.service';
import { SignupRequestDto } from '../../user/dto/signup.request.dto';
import { SignupResponseDto } from '../../user/dto/signup.response.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

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
}
