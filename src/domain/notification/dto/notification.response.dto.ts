// src/domain/notification/dto/notification.response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class NotificationResponseDto {
  @ApiProperty({ example: 1, description: '알림 ID' })
  id: number;

  @ApiProperty({ example: '댓글이 달렸습니다.', description: '알림 메시지' })
  message: string;

  @ApiProperty({ example: false, description: '읽음 여부' })
  isRead: boolean;

  @ApiProperty({
    example: '2025-05-04T12:00:00.000Z',
    description: '알림 생성 일자',
  })
  createdAt: Date;
}
