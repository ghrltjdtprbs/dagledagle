import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from '../entity/comment.entity';
import { UserEntity } from '../../user/entity/user.entity';
import { PostEntity } from '../../post/entity/post.entity';
import { CreateCommentRequestDto } from '../../comment/dto/request/create-comment.request.dto';
import { CommentNotFoundException } from '../exception/comment-not-found.exception';

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
      parent = await this.commentRepo.findOneBy({ id: dto.parentCommentId });
      if (!parent) throw new CommentNotFoundException();
    }

    const comment = this.commentRepo.create({
      content: dto.content,
      post,
      author: user,
      parent: parent ?? null,
    });

    await this.commentRepo.save(comment);
  }
}
