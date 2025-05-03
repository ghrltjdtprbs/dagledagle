// src/domain/auth/token/auth.token.controller.ts
import { Body, Controller, Post, Delete, UseGuards, Req } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthTokenService } from './auth.token.service';
import { RefreshRequestDto } from '../dto/request/refresh.request.dto';
import { LoginResponseDto } from '../dto/response/login.response.dto';
import { JwtAuthGuard } from '../../../common/guard/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthTokenController {
  constructor(private readonly authTokenService: AuthTokenService) {}

  @Post('refresh')
  @ApiOperation({
    summary: 'AccessToken 재발급',
    description: 'RefreshToken을 이용해 새 AccessToken을 발급합니다.',
  })
  async refresh(@Body() dto: RefreshRequestDto): Promise<LoginResponseDto> {
    return this.authTokenService.refreshToken(dto.refreshToken);
  }

  @Delete('logout')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '로그아웃',
    description: '현재 유저의 refreshToken을 삭제합니다.',
  })
  async logout(@Req() req): Promise<string> {
    await this.authTokenService.logout(req.user.id);
    return '로그아웃 완료';
  }
}
