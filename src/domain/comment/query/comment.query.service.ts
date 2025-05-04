// src/domain/comment/query/comment.query.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from '../entity/comment.entity';
import { CommentMyResponseDto } from '../dto/response/comment-my.response.dto';

@Injectable()
export class CommentQueryService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepo: Repository<CommentEntity>,
  ) {}

  async getMyComments(userId: number): Promise<CommentMyResponseDto[]> {
    const comments = await this.commentRepo
      .createQueryBuilder('comment')
      .where('comment.authorId = :userId', { userId })
      .andWhere('comment.deletedAt IS NULL')
      .orderBy('comment.Id', 'DESC')
      .getMany();

    return comments.map((comment) => ({
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt,
    }));
  }
}
