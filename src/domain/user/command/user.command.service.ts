// src/domain/user/command/user.command.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { DuplicateEmailException } from '../exception/duplicate-email.exception';
import { UserNotFoundException } from '../exception/user-not-found.exception';
import { PasswordMismatchException } from '../exception/password-mismatch.exception';

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

  async softDelete(userId: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      withDeleted: false,
    });

    if (!user) throw new UserNotFoundException();

    user.delete(new Date());
    await this.userRepository.save(user);
  }

  async updateUser(
    userId: number,
    payload: { name?: string; nickname?: string },
  ): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      withDeleted: false,
    });

    if (!user) throw new UserNotFoundException();

    if (payload.name) user.name = payload.name;
    if (payload.nickname) user.nickname = payload.nickname;

    await this.userRepository.save(user);
  }

  async updatePassword(
    userId: number,
    payload: { currentPassword: string; newPassword: string },
  ): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      withDeleted: false,
    });

    if (!user) throw new UserNotFoundException();

    const isMatch = await bcrypt.compare(
      payload.currentPassword,
      user.password,
    );
    if (!isMatch) {
      throw new PasswordMismatchException();
    }

    user.password = await bcrypt.hash(payload.newPassword, 10);
    await this.userRepository.save(user);
  }
}
