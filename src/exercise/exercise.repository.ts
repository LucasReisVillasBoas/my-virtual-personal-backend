import { PostgresEntityRepository } from '../database/postgres-entity.repository';
import { Exercise } from '../entities/exercise/exercise.entity';

export class ExerciseRepository extends PostgresEntityRepository<Exercise> {
  // custom methods
}
