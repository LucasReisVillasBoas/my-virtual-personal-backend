import { PostgresEntityRepository } from '../database/postgres-entity.repository';
import { Professionals } from 'src/entities/professionals/professionals.entity';

export class ProfessionalRepository extends PostgresEntityRepository<Professionals> {
  // custom methods
}
