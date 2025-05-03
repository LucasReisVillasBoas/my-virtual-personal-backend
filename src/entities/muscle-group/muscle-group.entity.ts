import {
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { DeafultEntity } from '../default.entity';
import { MuscleGroupRepository } from '../../muscle-group/muscle-group.repository';

@Entity({ repository: () => MuscleGroupRepository })
export class MuscleGroup extends DeafultEntity {
  [EntityRepositoryType]?: MuscleGroupRepository;

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
