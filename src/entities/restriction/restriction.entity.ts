import {
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { DeafultEntity } from '../default.entity';
import { RestrictionRepository } from '../../restriction/restriction.repository';

@Entity({ repository: () => RestrictionRepository })
export class Restriction extends DeafultEntity {
  [EntityRepositoryType]?: RestrictionRepository;

  @Expose()
  @ApiProperty()
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Expose()
  @ApiProperty()
  @Property({ nullable: false })
  code: string;

  @Expose()
  @ApiProperty()
  @Property({ nullable: false })
  description: string;
}
