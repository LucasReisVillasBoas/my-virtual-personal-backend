import { defineConfig } from '@mikro-orm/postgresql';
import { User } from '../entities/user/user.entity';
import { Gender } from '../entities/gender/gender.entity';
import { Goals } from '../entities/goals/goals.entity';
import { MuscleGroup } from '../entities/muscle-group/muscle-group.entity';
import { Restriction } from '../entities/restriction/restriction.entity';
import { TrainingType } from '../entities/training/training-type.entity';
import { Exercise } from '../entities/exercise/exercise.entity';
import { Professionals } from '../entities/professionals/professionals.entity';
import { DATABASE_NAME, DATABASE_PASSWORD, DATABASE_USER } from '../settings';

export default defineConfig({
  dbName: DATABASE_NAME,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  entities: [
    User,
    Gender,
    Goals,
    MuscleGroup,
    Restriction,
    TrainingType,
    Exercise,
    Professionals,
  ],
  migrations: {
    path: 'src/database/migrations',
  },
  seeder: {
    path: 'src/database/seeders',
  },
});
