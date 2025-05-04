// src/domain/comment/comment.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './entity/comment.entity';
import { CommentCommandController } from './command/comment.command.controller';
import { CommentCommandService } from './command/comment.command.service';
import { CommentQueryController } from './query/comment.query.controller';
import { CommentQueryService } from './query/comment.query.service';
import { UserEntity } from '../user/entity/user.entity';
import { PostEntity } from '../post/entity/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, UserEntity, PostEntity])],
  controllers: [CommentCommandController, CommentQueryController],
  providers: [CommentCommandService, CommentQueryService],
  exports: [CommentCommandService, CommentQueryService],
})
export class CommentModule {}
