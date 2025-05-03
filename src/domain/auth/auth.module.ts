import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entity/user.entity';
import { RefreshTokenEntity } from './entity/refresh-token.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RefreshTokenEntity]), // ✅ 둘 다 등록
    JwtModule.register({}), // 나중에 config 기반으로 옮겨도 됨
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
