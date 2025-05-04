// src/domain/post/command/post.command.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from '../entity/post.entity';
import { UserEntity } from '../../user/entity/user.entity';
import { PostAttachmentEntity } from '../entity/post-attachment.entity';
import { CreatePostRequestDto } from '../../post/dto/request/create-post.request.dto';
import { UpdatePostRequestDto } from '../../post/dto/request/update-post.request.dto';
import { ForbiddenAccessException } from '../exception/forbidden-access.exception';
import { PostNotFoundException } from '../exception/post-not-found.exception';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NotificationEvent } from '../../notification/event/notification.event';

@Injectable()
export class PostCommandService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepo: Repository<PostEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,

    @InjectRepository(PostAttachmentEntity)
    private readonly postAttachmentRepo: Repository<PostAttachmentEntity>,

    private readonly eventEmitter: EventEmitter2,
  ) {}

  async createPost(userId: number, dto: CreatePostRequestDto): Promise<void> {
    const author = await this.userRepo.findOneByOrFail({ id: userId });

    const attachments = dto.attachments?.map((file) =>
      this.postAttachmentRepo.create({
        fileName: file.fileName,
        originalName: file.originalName,
        fileUrl: file.fileUrl,
      }),
    );

    const post = this.postRepo.create({
      title: dto.title,
      content: dto.content,
      author,
      attachments,
    });

    await this.postRepo.save(post);
  }

  async updatePost(postId: number, userId: number, dto: UpdatePostRequestDto) {
    const post = await this.postRepo.findOne({
      where: { id: postId },
      relations: ['author', 'attachments'],
      withDeleted: false,
    });

    if (!post) throw new PostNotFoundException();
    if (post.author.id !== userId) throw new ForbiddenAccessException();

    if (dto.title) post.title = dto.title;
    if (dto.content) post.content = dto.content;

    if (dto.attachments) {
      post.attachments = dto.attachments.map((file) =>
        this.postAttachmentRepo.create({
          fileName: file.fileName,
          originalName: file.originalName,
          fileUrl: file.fileUrl,
        }),
      );
    }

    await this.postRepo.save(post);

    // ✅ 댓글 단 유저와 좋아요 누른 유저 불러오기
    const [commentUsers, likeUsers] = await Promise.all([
      this.userRepo
        .createQueryBuilder('user')
        .innerJoin('user.comments', 'comment', 'comment.postId = :postId', {
          postId,
        })
        .getMany(),

      this.userRepo
        .createQueryBuilder('user')
        .innerJoin('user.likes', 'like', 'like.postId = :postId', {
          postId,
        })
        .getMany(),
    ]);

    const notifiedUserIds = new Set<number>();

    [...commentUsers, ...likeUsers].forEach((user) => {
      if (user.id !== userId && !notifiedUserIds.has(user.id)) {
        this.eventEmitter.emit(
          'notification.created',
          new NotificationEvent(
            user.id,
            `게시글 "${post.title}"이 수정되었습니다.`,
          ),
        );
        notifiedUserIds.add(user.id);
      }
    });
  }

  async softDelete(postId: number, userId: number): Promise<void> {
    const post = await this.postRepo.findOne({
      where: { id: postId },
      relations: ['author'],
      withDeleted: false,
    });

    if (!post) throw new PostNotFoundException();
    if (post.author.id !== userId) throw new ForbiddenAccessException();

    post.delete(new Date());
    await this.postRepo.save(post);
  }
}
