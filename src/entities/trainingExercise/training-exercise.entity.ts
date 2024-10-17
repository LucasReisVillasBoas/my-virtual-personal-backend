import {
  Entity,
  EntityRepositoryType,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { DeafultEntity } from '../default.entity';
import { TrainingExerciseRepository } from '../../training-exercise/training-exercise.repository';
import { Training } from '../training/training.entity';
import { Exercise } from '../exercise/exercise.entity';

@Entity({ repository: () => TrainingExerciseRepository })
export class TrainingExercise extends DeafultEntity {
  [EntityRepositoryType]?: TrainingExerciseRepository;

  @Expose()
  @ApiProperty()
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Expose()
  @ApiProperty()
  @Property({ nullable: true })
  sets: number;

  @Expose()
  @ApiProperty()
  @Property({ nullable: true })
  reps: string;

  @Expose()
  @ApiProperty()
  @Property({ nullable: true })
  rest_time: string;

  @Expose({ toClassOnly: true })
  @ApiProperty({ type: () => Training })
  @Type(() => Training)
  @ManyToOne({ entity: () => Training, index: true, nullable: true })
  training: Training;

  @Expose({ toClassOnly: true })
  @ApiProperty()
  @Type(() => Exercise)
  @ManyToOne({ entity: () => Exercise, index: true, nullable: true })
  exercise: Exercise;
}
