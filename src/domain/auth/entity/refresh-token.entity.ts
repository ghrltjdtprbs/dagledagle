//src/domain/auth/entity/refresh-token.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from '../../user/entity/user.entity';
import { BaseEntity } from '../../../common/entity/base.entity';

@Entity('refresh_tokens')
export class RefreshTokenEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  user: UserEntity;

  @Column()
  token: string;

  @Column()
  expiredAt: Date;
}
