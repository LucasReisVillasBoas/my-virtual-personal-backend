import { defineConfig } from '@mikro-orm/postgresql';
import { User } from '../entities/user';

export default defineConfig({
  dbName: 'my-personal-db' /* passar para um .env */,
  user: 'postgres',
  password: 'postgres123',
  entities: [User],
  migrations: {
    path: 'src/database/migrations',
  },
});
