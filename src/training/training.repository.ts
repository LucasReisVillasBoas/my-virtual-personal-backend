import { PostgresEntityRepository } from '../database/postgres-entity.repository';
import { Training } from '../entities/training/training.entity';

export class TrainingRepository extends PostgresEntityRepository<Training> {
  // custom methods
}
