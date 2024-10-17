import {
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { DeafultEntity } from '../default.entity';
import { TrainingTypeRepository } from '../../training/training-type.repository';

@Entity({ repository: () => TrainingTypeRepository })
export class TrainingType extends DeafultEntity {
  [EntityRepositoryType]?: TrainingTypeRepository;

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
