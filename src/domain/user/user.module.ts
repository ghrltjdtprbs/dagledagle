// src/domain/user/user.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './user.entity';
import { UserCommandService } from './command/user.command.service';
import { UserCommandController } from './command/user.command.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserCommandController],
  providers: [UserCommandService],
  exports: [UserCommandService],
})
export class UserModule {}
