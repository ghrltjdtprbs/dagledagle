// src/domain/user/query/user.query.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserQueryService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getMyInfo(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      withDeleted: false, // Soft Delete 제외
    });

    if (!user) throw new NotFoundException('사용자를 찾을 수 없습니다.');

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      nickname: user.nickname,
    };
  }
}
