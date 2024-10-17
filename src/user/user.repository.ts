import { PostgresEntityRepository } from '../database/postgres-entity.repository';
import { User } from 'src/entities/user/user.entity';

export class UserRepository extends PostgresEntityRepository<User> {
  // custom methods
}
