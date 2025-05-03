import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { UserEntity } from '../user/entity/user.entity';
import { RefreshTokenEntity } from './entity/refresh-token.entity';

import { AuthController } from './command/auth.command.controller';
import { AuthService } from './command/auth.command.service';

import { AuthTokenController } from './token/auth.token.controller';
import { AuthTokenService } from './token/auth.token.service';

import { JwtStrategy } from '../../common/strategy/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RefreshTokenEntity]),
    JwtModule.register({}),
  ],
  controllers: [
    AuthController,
    AuthTokenController, 
  ],
  providers: [
    AuthService,
    AuthTokenService, 
    JwtStrategy,
  ],
})
export class AuthModule {}
