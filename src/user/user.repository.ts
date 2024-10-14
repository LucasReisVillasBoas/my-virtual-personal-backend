import { PostgresEntityRepository } from 'src/database/postgres-entity.repository';
import { User } from 'src/entities/user';

export class UserRepository extends PostgresEntityRepository<User> {
  // custom methods
}
