// src/common/entity/soft-delete-base.entity.ts
import { DeleteDateColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

export abstract class SoftDeletableBaseEntity extends BaseEntity {
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;

  delete(currentTime: Date) {
    if (!this.deletedAt) {
      this.deletedAt = currentTime;
    }
  }

  isDeleted(): boolean {
    return !!this.deletedAt;
  }
}
