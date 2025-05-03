// src/domain/auth/token/auth.token.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthTokenService } from './auth.token.service';
import { RefreshRequestDto } from '../dto/request/refresh.request.dto';
import { LoginResponseDto } from '../dto/response/login.response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthTokenController {
  constructor(private readonly authTokenService: AuthTokenService) {}

  @Post('refresh')
  @ApiOperation({ summary: 'AccessToken 재발급', description: 'RefreshToken을 이용해 새 AccessToken을 발급합니다.' })
  async refresh(@Body() dto: RefreshRequestDto): Promise<LoginResponseDto> {
    return this.authTokenService.refreshToken(dto.refreshToken);
  }
}
