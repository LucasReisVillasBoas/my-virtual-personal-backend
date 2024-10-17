import { PostgresEntityRepository } from '../database/postgres-entity.repository';
import { Gender } from '../entities/gender/gender.entity';

export class GenderRepository extends PostgresEntityRepository<Gender> {
  // custom methods
}
