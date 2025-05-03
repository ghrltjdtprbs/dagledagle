import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UserEntity } from '../../user/entity/user.entity';
import { PostEntity } from '../../post/entity/post.entity';
import { SoftDeletableBaseEntity } from '../../../common/entity/soft-delete-base.entity';

@Entity('comments')
export class CommentEntity extends SoftDeletableBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @ManyToOne(() => PostEntity, { onDelete: 'CASCADE' })
  post: PostEntity;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  author: UserEntity;

  @ManyToOne(() => CommentEntity, (comment) => comment.children, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  parent: CommentEntity | null;

  @Column({ nullable: true })
  parentId: number | null;
  
  @OneToMany(() => CommentEntity, (comment) => comment.parent)
  children: CommentEntity[];
}
