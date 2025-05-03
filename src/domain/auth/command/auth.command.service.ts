import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UserEntity } from '../../user/entity/user.entity';
import { RefreshTokenEntity } from '../entity/refresh-token.entity';
import { LoginResponseDto } from '../dto/response/login.response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(RefreshTokenEntity)
    private readonly refreshTokenRepo: Repository<RefreshTokenEntity>,

    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('이메일 틀림');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('비밀번호 틀림');

    return user;
  }

  async login(user: UserEntity): Promise<LoginResponseDto> {
    const payload = { sub: user.id, email: user.email };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '20s',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    const expiredAt = new Date();
    expiredAt.setDate(expiredAt.getDate() + 7);

    await this.refreshTokenRepo.delete({ user: { id: user.id } });

    const tokenEntity = this.refreshTokenRepo.create({
      user,
      token: refreshToken,
      expiredAt,
    });
    await this.refreshTokenRepo.save(tokenEntity);

    return { accessToken, refreshToken };
  }
}
