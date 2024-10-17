import {
  Collection,
  Entity,
  EntityRepositoryType,
  ManyToMany,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { DeafultEntity } from '../default.entity';
import { ExerciseRepository } from '../../exercise/exercise.repository';
import { TrainingExercise } from '../trainingExercise/training-exercise.entity';
import { MuscleGroup } from '../muscleGroup/muscle-group.entity';

@Entity({ repository: () => ExerciseRepository })
export class Exercise extends DeafultEntity {
  [EntityRepositoryType]?: ExerciseRepository;

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
  @ApiProperty({ type: () => TrainingExercise, isArray: true })
  @Type(() => TrainingExercise)
  @OneToMany(() => TrainingExercise, (item) => item.exercise)
  trainingExerciseList?: TrainingExercise[];

  @Expose()
  @ApiProperty({ type: () => MuscleGroup, isArray: true })
  @ManyToMany(() => MuscleGroup, (muscleGroup) => muscleGroup.exerciseList, {
    owner: true,
  })
  muscleGroupList = new Collection<MuscleGroup>(this);
}
