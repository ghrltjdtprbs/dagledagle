// src/domain/notification/event/notification.event.ts
export class NotificationEvent {
    constructor(
      public readonly userId: number,
      public readonly message: string,
    ) {}
  }
  