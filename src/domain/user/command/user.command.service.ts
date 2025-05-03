// src/domain/user/command/user.command.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { DuplicateEmailException } from '../exception/duplicate-email.exception';

@Injectable()
export class UserCommandService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(payload: {
    email: string;
    name: string;
    nickname: string;
    password: string;
  }): Promise<UserEntity> {
    const exists = await this.userRepository.findOne({
      where: { email: payload.email },
      withDeleted: false,
    });
    if (exists) throw new DuplicateEmailException();

    const hashed = await bcrypt.hash(payload.password, 10);

    const user = this.userRepository.create({
      ...payload,
      password: hashed,
    });

    return this.userRepository.save(user);
  }
}
