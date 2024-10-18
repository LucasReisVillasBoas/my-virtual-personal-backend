import { PostgresEntityRepository } from '../database/postgres-entity.repository';
import { Goals } from '../entities/goals/goals.entity';

export class GoalsRepository extends PostgresEntityRepository<Goals> {
  // custom methods
}
