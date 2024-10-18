import {
  Collection,
  Entity,
  EntityRepositoryType,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { DeafultEntity } from '../default.entity';
import { MuscleGroupRepository } from '../../muscle-group/muscle-group.repository';
import { Exercise } from '../exercise/exercise.entity';

@Entity({ repository: () => MuscleGroupRepository })
export class MuscleGroup extends DeafultEntity {
  [EntityRepositoryType]?: MuscleGroupRepository;

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

  @Expose()
  @ApiProperty({ type: () => Exercise, isArray: true })
  @ManyToMany(() => Exercise, (exercise) => exercise.muscleGroupList)
  exerciseList = new Collection<Exercise>(this);
}
