// src/domain/post/post.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entity/post.entity';
import { PostAttachmentEntity } from './entity/post-attachment.entity';
import { UserEntity } from '../user/entity/user.entity';
import { CommentEntity } from '../comment/entity/comment.entity';
import { LikeEntity } from '../like/entity/like.entity';

import { PostCommandService } from './command/post.command.service';
import { PostCommandController } from './command/post.command.controller';
import { PostQueryService } from './query/post.query.service';
import { PostQueryController } from './query/post.query.controller';
import { UploadController } from './file/upload.controller';
import { UploadService } from './file/upload.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostEntity,
      PostAttachmentEntity,
      UserEntity,
      CommentEntity,
      LikeEntity,
    ]),
  ],
  controllers: [PostCommandController, PostQueryController, UploadController],
  providers: [PostCommandService, PostQueryService, UploadService],
})
export class PostModule {}
