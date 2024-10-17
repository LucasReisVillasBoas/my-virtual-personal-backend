import { Entity, BaseEntity as MikroEntity, Property } from '@mikro-orm/core';
import { Expose } from 'class-transformer';

@Entity({ abstract: true })
export abstract class DeafultEntity extends MikroEntity {
  @Expose({ toClassOnly: true })
  @Property({ onCreate: () => new Date() })
  createdAt = new Date();

  @Expose({ toClassOnly: true })
  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
