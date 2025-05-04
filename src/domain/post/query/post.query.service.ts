// src/domain/post/query/post.query.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { PostEntity } from '../entity/post.entity';
import { CommentEntity } from '../../comment/entity/comment.entity';
import { LikeEntity } from '../../like/entity/like.entity';
import { PostNotFoundException } from '../exception/post-not-found.exception';
import { PostDetailResponseDto } from '../dto/response/post-detail.response.dto';
import { CommentResponseDto } from '../../comment/dto/response/comment.response.dto';
import { PostSummaryResponseDto } from '../dto/response/post-summary.response.dto';
import { PostListResponseDto } from '../dto/response/post-list.response.dto';

@Injectable()
export class PostQueryService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepo: Repository<PostEntity>,
    @InjectRepository(CommentEntity)
    private readonly commentRepo: Repository<CommentEntity>,
    @InjectRepository(LikeEntity)
    private readonly likeRepo: Repository<LikeEntity>,
  ) {}

  async getPostDetail(
    postId: number,
    userId: number,
  ): Promise<PostDetailResponseDto> {
    const post = await this.postRepo.findOne({
      where: { id: postId },
      relations: ['author', 'attachments'],
      withDeleted: true,
    });

    if (!post) throw new PostNotFoundException();

    const comments = await this.commentRepo
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.author', 'author')
      .leftJoinAndSelect('comment.parent', 'parent')
      .leftJoinAndSelect('comment.children', 'children')
      .leftJoinAndSelect('children.author', 'childAuthor')
      .addSelect('comment.parentId')
      .where('comment.postId = :postId', { postId })
      .withDeleted()
      .orderBy('comment.id', 'DESC')
      .getMany();

    const hasLiveComments = comments.some((c) => !c.parentId && !c.deletedAt);
    if (post.deletedAt && !hasLiveComments) throw new PostNotFoundException();

    if (!post.deletedAt) {
      post.viewCount++;
      await this.postRepo.save(post);
    }

    const isLiked = await this.likeRepo.exist({
      where: { post: { id: postId }, user: { id: userId } },
    });

    const rootComments = comments.filter(
      (c) => !c.parentId && (!c.deletedAt || (c.children?.length ?? 0) > 0),
    );

    const commentDtos = rootComments.map((c) => this.mapComment(c));
    const totalCommentCount = comments.filter((c) => !c.deletedAt).length;

    return {
      id: post.id,
      title: post.deletedAt ? '[삭제된 게시글입니다]' : post.title,
      content: post.deletedAt
        ? '작성자가 게시글을 삭제했습니다.'
        : post.content,
      author: post.author
        ? { id: post.author.id, nickname: post.author.nickname }
        : { id: 0, nickname: '[탈퇴한 사용자]' },
      viewCount: post.viewCount,
      likeCount: post.likeCount,
      commentCount: totalCommentCount,
      isLiked,
      attachments: post.attachments.map((a) => ({
        fileName: a.fileName,
        originalName: a.originalName,
        fileUrl: a.fileUrl,
      })),
      comments: commentDtos,
      createdAt: post.createdAt,
    };
  }

  private mapComment(comment: CommentEntity): CommentResponseDto {
    const content = comment.deletedAt ? '삭제된 댓글입니다.' : comment.content;

    const children = (comment.children ?? []).map((child) => ({
      id: child.id,
      content: child.deletedAt ? '삭제된 댓글입니다.' : child.content,
      author: child.author
        ? { id: child.author.id, nickname: child.author.nickname }
        : { id: 0, nickname: '[탈퇴한 사용자]' },
      children: [], // 대댓글은 1단계까지만
    }));

    return {
      id: comment.id,
      content,
      author: comment.author
        ? { id: comment.author.id, nickname: comment.author.nickname }
        : { id: 0, nickname: '[탈퇴한 사용자]' },
      children,
    };
  }

  async getPosts(
    params: { page: number; size: number; sort: 'latest' | 'popular' },
    userId: number,
  ): Promise<PostListResponseDto> {
    const { page, size, sort } = params;
    const skip = (page - 1) * size;

    const orderBy =
      sort === 'popular'
        ? ({ likeCount: 'DESC', id: 'DESC' } as const)
        : ({ id: 'DESC' } as const);

    const [posts, totalCount] = await this.postRepo.findAndCount({
      where: { deletedAt: IsNull() },
      relations: ['author'],
      order: orderBy,
      skip,
      take: size,
    });

    const likedPostIds = new Set(
      (
        await this.likeRepo.find({
          where: { user: { id: userId } },
          relations: ['post'],
        })
      ).map((like) => like.post.id),
    );

    const items: PostSummaryResponseDto[] = posts.map((post) => ({
      id: post.id,
      title: post.title,
      author: {
        id: post.author.id,
        nickname: post.author.nickname,
      },
      viewCount: post.viewCount,
      likeCount: post.likeCount,
      commentCount: post.commentCount ?? 0,
      isLiked: likedPostIds.has(post.id),
      createdAt: post.createdAt,
    }));

    return {
      items,
      page,
      size,
      totalCount,
      totalPages: Math.ceil(totalCount / size),
    };
  }
}
