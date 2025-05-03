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

@Injectable()
export class PostCommandService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepo: Repository<PostEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,

    @InjectRepository(PostAttachmentEntity)
    private readonly postAttachmentRepo: Repository<PostAttachmentEntity>,
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
  
    if (!post) throw new Error('게시글이 존재하지 않습니다.');
    if (post.author.id !== userId) throw new ForbiddenAccessException();
  
    if (dto.title) post.title = dto.title;
    if (dto.content) post.content = dto.content;
  
    if (dto.attachments) {
      // 기존 첨부파일 제거
      post.attachments = dto.attachments.map((file) =>
        this.postAttachmentRepo.create({
          fileName: file.fileName,
          originalName: file.originalName,
          fileUrl: file.fileUrl,
        }),
      );
    }
  
    await this.postRepo.save(post);
  }
}
