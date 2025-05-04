import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from '../entity/comment.entity';
import { UserEntity } from '../../user/entity/user.entity';
import { PostEntity } from '../../post/entity/post.entity';
import { CreateCommentRequestDto } from '../../comment/dto/request/create-comment.request.dto';
import { CommentNotFoundException } from '../exception/comment-not-found.exception';
import { ForbiddenAccessException } from '../../post/exception/forbidden-access.exception';
import { UpdateCommentRequestDto } from '../../comment/dto/request/update-comment.request.dto';
import { CommentDepthExceededException } from '../../comment/exception/comment-depth-exceeded.exception';
import { PostNotFoundException } from '@/domain/post/exception/post-not-found.exception';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NotificationEvent } from '../../notification/event/notification.event';

@Injectable()
export class CommentCommandService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepo: Repository<CommentEntity>,

    @InjectRepository(PostEntity)
    private readonly postRepo: Repository<PostEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,

    private readonly eventEmitter: EventEmitter2,
  ) {}

  async createComment(
    userId: number,
    postId: number,
    dto: CreateCommentRequestDto,
  ): Promise<void> {
    const [user, post] = await Promise.all([
      this.userRepo.findOneByOrFail({ id: userId }),
      this.postRepo.findOne({
        where: { id: postId },
        relations: ['author'],
        withDeleted: false,
      }),
    ]);

    if (!post) throw new PostNotFoundException();

    let parent: CommentEntity | null = null;

    if (dto.parentCommentId) {
      parent = await this.commentRepo.findOne({
        where: { id: dto.parentCommentId },
        relations: ['parent'],
      });

      if (!parent) throw new CommentNotFoundException();

      if (parent) {
        throw new CommentDepthExceededException();
      }
    }

    const comment = this.commentRepo.create({
      content: dto.content,
      post,
      author: user,
      parent,
    });

    await this.commentRepo.save(comment);

    post.commentCount += 1;
    await this.postRepo.save(post);

    if (post.author.id !== userId) {
      this.eventEmitter.emit(
        'notification.created',
        new NotificationEvent(
          post.author.id,
          `게시글 "${post.title}"에 댓글이 달렸습니다.`,
        ),
      );
    }
  }

  async softDelete(commentId: number, userId: number): Promise<void> {
    const comment = await this.commentRepo.findOne({
      where: { id: commentId },
      relations: ['author', 'children', 'post'],
      withDeleted: false,
    });

    if (!comment) throw new CommentNotFoundException();
    if (comment.author.id !== userId) throw new ForbiddenAccessException();

    comment.delete(new Date());
    await this.commentRepo.save(comment);

    comment.post.commentCount = Math.max(0, comment.post.commentCount - 1);
    await this.postRepo.save(comment.post);
  }

  async update(
    commentId: number,
    userId: number,
    dto: UpdateCommentRequestDto,
  ): Promise<void> {
    const comment = await this.commentRepo.findOne({
      where: { id: commentId },
      relations: ['author'],
      withDeleted: false,
    });

    if (!comment) throw new CommentNotFoundException();
    if (comment.author.id !== userId) throw new ForbiddenAccessException();
    if (comment.deletedAt) throw new ForbiddenAccessException();

    comment.content = dto.content;
    await this.commentRepo.save(comment);
  }
}
