// src/domain/post/post.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entity/post.entity';
import { PostAttachmentEntity } from './entity/post-attachment.entity';
import { UserEntity } from '../user/entity/user.entity';
import { PostCommandService } from './command/post.command.service';
import { PostCommandController } from './command/post.command.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, PostAttachmentEntity, UserEntity])],
  controllers: [PostCommandController],
  providers: [PostCommandService],
})
export class PostModule {}
