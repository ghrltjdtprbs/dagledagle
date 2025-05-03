// src/domain/post/entity/post-attachment.entity.ts
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PostEntity } from './post.entity';
import { SoftDeletableBaseEntity } from '../../../common/entity/soft-delete-base.entity';

@Entity('post_attachments')
export class PostAttachmentEntity extends SoftDeletableBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PostEntity, (post) => post.attachments, {
    onDelete: 'CASCADE',
  })
  post: PostEntity;

  @Column()
  fileName: string; // S3에 저장된 고유 파일명

  @Column()
  originalName: string; // 사용자가 업로드한 원래 이름

  @Column()
  fileUrl: string; // S3 URL
}
