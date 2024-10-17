import {
  Entity,
  EntityRepositoryType,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { DeafultEntity } from '../default.entity';
import { TrainingRepository } from '../../training/training.repository';
import { User } from '../user/user.entity';
import { TrainingType } from './training-type.entity';
import { Goals } from '../goals/goals.entity';
import { TrainingExercise } from '../trainingExercise/training-exercise.entity';

@Entity({ repository: () => TrainingRepository })
export class Training extends DeafultEntity {
  [EntityRepositoryType]?: TrainingRepository;

  @Expose()
  @ApiProperty()
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Expose()
  @ApiProperty()
  @Property()
  active: boolean;

  @Expose({ toClassOnly: true })
  @ApiProperty({ type: () => User })
  @Type(() => User)
  @ManyToOne({ entity: () => User, index: true, nullable: true })
  user: User;

  @Expose()
  @ApiProperty()
  @Type(() => TrainingType)
  @ManyToOne({ index: true, nullable: true })
  trainingType: TrainingType;

  @Expose({ toClassOnly: true })
  @ApiProperty()
  @Type(() => Goals)
  @ManyToOne({ entity: () => Goals, index: true, nullable: true })
  goals: Goals;

  @Expose()
  @ApiProperty({ type: () => TrainingExercise, isArray: true })
  @Type(() => TrainingExercise)
  @OneToMany(() => TrainingExercise, (item) => item.training)
  trainingExerciseList?: TrainingExercise[];
}
