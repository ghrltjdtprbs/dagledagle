import { Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { UserEntity } from '../../user/entity/user.entity';
import { PostEntity } from '../../post/entity/post.entity';
import { BaseEntity } from '../../../common/entity/base.entity';

@Entity('likes')
@Unique(['user', 'post'])
export class LikeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  user: UserEntity;

  @ManyToOne(() => PostEntity, { onDelete: 'CASCADE' })
  post: PostEntity;
}
