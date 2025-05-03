// src/domain/user/user.entity.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { SoftDeletableBaseEntity } from '../../../common/entity/soft-delete-base.entity';

@Entity('users')
export class UserEntity extends SoftDeletableBaseEntity {
  @PrimaryGeneratedColumn()
  id: number; // pk

  @Column()
  email: string; // 이메일(로그인 아이디)

  @Column()
  name: string; // 사용자 이름

  @Column()
  nickname: string; // 닉네임

  @Column()
  password: string; // 비밀번호
}
