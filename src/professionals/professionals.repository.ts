import { PostgresEntityRepository } from '../database/postgres-entity.repository';
import { Professionals } from 'src/entities/professionals/professionals.entity';

export class ProfessionalsRepository extends PostgresEntityRepository<Professionals> {
  // custom methods
}
