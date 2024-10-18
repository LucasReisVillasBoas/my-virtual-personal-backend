import { defineConfig } from '@mikro-orm/postgresql';
import { User } from '../entities/user/user.entity';
import { Gender } from '../entities/gender/gender.entity';
import { Goals } from '../entities/goals/goals.entity';
import { MuscleGroup } from '../entities/muscle-group/muscle-group.entity';
import { Restriction } from '../entities/restriction/restriction.entity';
import { TrainingType } from '../entities/training/training-type.entity';
import { Exercise } from '../entities/exercise/exercise.entity';

export default defineConfig({
  dbName: 'my-personal-db' /* passar para um .env */,
  user: 'postgres',
  password: 'postgres123',
  entities: [
    User,
    Gender,
    Goals,
    MuscleGroup,
    Restriction,
    TrainingType,
    Exercise,
  ],
  migrations: {
    path: 'src/database/migrations',
  },
  seeder: {
    path: 'src/database/seeders',
  },
});
