import {
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { DeafultEntity } from '../default.entity';
import { GenderRepository } from '../../gender/gender.repository';

@Entity({ repository: () => GenderRepository })
export class Gender extends DeafultEntity {
  [EntityRepositoryType]?: GenderRepository;

  @Expose()
  @ApiProperty()
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Expose()
  @ApiProperty()
  @Property({ nullable: false, unique: true })
  code: string;

  @Expose()
  @ApiProperty()
  @Property({ nullable: false })
  description: string;
}
