// src/domain/user/query/user.query.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { UserProfileResponseDto } from '../../user/dto/user-profile.response.dto';
import { UserNotFoundException } from '../exception/user-not-found.exception';

@Injectable()
export class UserQueryService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getMyInfo(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      withDeleted: false,
    });

    if (!user) throw new UserNotFoundException();

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      nickname: user.nickname,
    };
  }

  async getUserProfile(userId: number): Promise<UserProfileResponseDto> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      withDeleted: false,
    });
  
    if (!user) throw new UserNotFoundException();
  
    return {
      id: user.id,
      name: user.name,
      nickname: user.nickname,
    };
  }
}
