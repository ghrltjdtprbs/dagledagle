// src/domain/notification/listener/notification.listener.ts
import { OnEvent } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationEntity } from '../entity/notification.entity';
import { UserEntity } from '../../user/entity/user.entity';
import { NotificationEvent } from '../event/notification.event';

@Injectable()
export class NotificationListener {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly notificationRepo: Repository<NotificationEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  @OnEvent('notification.created')
  async handleNotification(event: NotificationEvent) {
    const user = await this.userRepo.findOneBy({ id: event.userId });
    if (!user) return;

    const notification = this.notificationRepo.create({
      user,
      message: event.message,
    });

    await this.notificationRepo.save(notification);
  }
}
