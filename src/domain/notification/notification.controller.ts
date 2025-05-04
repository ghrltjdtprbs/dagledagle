// src/domain/notification/notification.controller.ts
import {
    Controller,
    Get,
    Patch,
    Param,
    UseGuards,
    Req,
  } from '@nestjs/common';
  import { JwtAuthGuard } from '../../common/guard/jwt-auth.guard';
  import { NotificationService } from './notification.service';
  import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
  import { NotificationResponseDto } from './dto/notification.response.dto';
  
  @ApiTags('Notifications')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Controller('notifications')
  export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}
  
    @Get('unread')
    @ApiOperation({ summary: '안 읽은 알림 목록 조회' })
    async getUnread(@Req() req): Promise<NotificationResponseDto[]> {
      return this.notificationService.getUnreadNotifications(req.user.id);
    }
  
    @Patch(':id/read')
    @ApiOperation({ summary: '알림 읽음 처리' })
    async markAsRead(@Req() req, @Param('id') id: number): Promise<void> {
      return this.notificationService.markAsRead(id, req.user.id);
    }
  }
  