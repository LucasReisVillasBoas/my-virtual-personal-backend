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
import { ExerciseRepository } from '../../exercise/exercise.repository';
import { TrainingExercise } from '../training-exercise/training-exercise.entity';
import { MuscleGroup } from '../muscle-group/muscle-group.entity';
import { User } from '../user/user.entity';

@Entity({ repository: () => ExerciseRepository })
export class Exercise extends DeafultEntity {
  [EntityRepositoryType]?: ExerciseRepository;

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

  @Expose()
  @ApiProperty({ type: () => TrainingExercise, isArray: true })
  @Type(() => TrainingExercise)
  @OneToMany(() => TrainingExercise, (item) => item.exercise)
  trainingExerciseList?: TrainingExercise[];

  @Expose({ toClassOnly: true })
  @ApiProperty({ type: () => MuscleGroup })
  @Type(() => MuscleGroup)
  @ManyToOne({ entity: () => MuscleGroup, index: true, nullable: true })
  muscleGroup: MuscleGroup;

  @Expose({ toClassOnly: true })
  @ApiProperty({ type: () => User, required: false })
  @Type(() => User)
  @ManyToOne({ entity: () => User, nullable: true, index: true })
  user?: User;
}
