// src/domain/notification/notification.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationEntity } from './entity/notification.entity';
import { NotificationResponseDto } from './dto/notification.response.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly notificationRepo: Repository<NotificationEntity>,
  ) {}

  async getUnreadNotifications(userId: number): Promise<NotificationResponseDto[]> {
    const list = await this.notificationRepo.find({
      where: { user: { id: userId }, isRead: false },
      order: { createdAt: 'DESC' },
    });

    return list.map((noti) => ({
      id: noti.id,
      message: noti.message,
      isRead: noti.isRead,
      createdAt: noti.createdAt,
    }));
  }

  async markAsRead(notificationId: number, userId: number): Promise<void> {
    const noti = await this.notificationRepo.findOne({
      where: { id: notificationId, user: { id: userId } },
    });

    if (!noti) throw new NotFoundException('알림이 존재하지 않습니다.');

    noti.isRead = true;
    await this.notificationRepo.save(noti);
  }
}
