// src/domain/post/entity/post.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UserEntity } from '../../user/entity/user.entity';
import { SoftDeletableBaseEntity } from '../../../common/entity/soft-delete-base.entity';
import { PostAttachmentEntity } from './post-attachment.entity';

@Entity('posts')
export class PostEntity extends SoftDeletableBaseEntity {
  @PrimaryGeneratedColumn()
  id: number; // PK

  @Column({ length: 100 })
  title: string; // 제목

  @Column('text')
  content: string; // 내용

  @Column({ default: 0 })
  viewCount: number; // 조회수

  @Column({ default: 0 })
  likeCount: number; // 좋아요 수

  @Column({ default: 0 })
  commentCount: number; // 댓글 수

  @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: 'CASCADE' })
  author: UserEntity; // 작성자

  @OneToMany(() => PostAttachmentEntity, (file) => file.post, {
    cascade: true,
  })
  attachments: PostAttachmentEntity[];
}
