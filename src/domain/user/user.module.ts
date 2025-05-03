// src/domain/user/user.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './entity/user.entity';
import { UserCommandService } from './command/user.command.service';
import { UserCommandController } from './command/user.command.controller';
import { UserQueryController } from './query/user.query.controller';
import { UserQueryService } from './query/user.query.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserCommandController, UserQueryController],
  providers: [UserCommandService, UserQueryService],
  exports: [UserCommandService, UserQueryService], // ✅ 쉼표 추가
})
export class UserModule {}
