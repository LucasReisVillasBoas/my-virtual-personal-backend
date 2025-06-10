import { PostgresEntityRepository } from '../database/postgres-entity.repository';
import { Injectable } from '@nestjs/common';
import { TrainingExercise } from '../entities/training-exercise/training-exercise.entity';

@Injectable()
export class TrainingExerciseRepository extends PostgresEntityRepository<TrainingExercise> {
  // custom methods
}
