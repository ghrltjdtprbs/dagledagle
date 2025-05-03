// src/domain/like/like.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeCommandController } from './command/like.command.controller';
import { LikeCommandService } from './command/like.command.service';
import { LikeEntity } from './entity/like.entity';
import { PostEntity } from '../post/entity/post.entity';
import { UserEntity } from '../user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LikeEntity, PostEntity, UserEntity])],
  controllers: [LikeCommandController],
  providers: [LikeCommandService],
  exports: [LikeCommandService],
})
export class LikeModule {}
