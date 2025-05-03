// src/domain/auth/token/auth.token.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { RefreshTokenEntity } from '../entity/refresh-token.entity';
import { LoginResponseDto } from '../dto/response/login.response.dto';

@Injectable()
export class AuthTokenService {
  constructor(
    @InjectRepository(RefreshTokenEntity)
    private readonly refreshTokenRepo: Repository<RefreshTokenEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async refreshToken(token: string): Promise<LoginResponseDto> {
    let payload: any;

    try {
      payload = this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
    } catch (e) {
      throw new UnauthorizedException('RefreshToken이 유효하지 않음');
    }

    const found = await this.refreshTokenRepo.findOne({
      where: { token },
      relations: ['user'],
    });

    if (!found || new Date() > found.expiredAt) {
      throw new UnauthorizedException('RefreshToken이 만료됐거나 존재하지 않음');
    }

    const newPayload = {
      sub: found.user.id,
      email: found.user.email,
    };

    const accessToken = this.jwtService.sign(newPayload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '1h',
    });

    return {
      accessToken,
      refreshToken: token, // 또는 갱신 전략 적용 가능
    };
  }
}
