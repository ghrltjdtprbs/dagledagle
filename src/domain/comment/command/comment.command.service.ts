import { Injectable, NotFoundException } from '@nestjs/common';
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

@Injectable()
export class CommentCommandService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepo: Repository<CommentEntity>,

    @InjectRepository(PostEntity)
    private readonly postRepo: Repository<PostEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async createComment(
    userId: number,
    postId: number,
    dto: CreateCommentRequestDto,
  ): Promise<void> {
    const [user, post] = await Promise.all([
      this.userRepo.findOneByOrFail({ id: userId }),
      this.postRepo.findOneByOrFail({ id: postId }),
    ]);

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
  }

  async softDelete(commentId: number, userId: number): Promise<void> {
    const comment = await this.commentRepo.findOne({
      where: { id: commentId },
      relations: ['author', 'children'],
      withDeleted: false,
    });

    if (!comment) throw new CommentNotFoundException();
    if (comment.author.id !== userId) throw new ForbiddenAccessException();

    comment.delete(new Date());
    await this.commentRepo.save(comment);
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
