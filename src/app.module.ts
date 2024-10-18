import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserModule } from './user/user.module';
import mikroOrmConfig from './config/mikro-orm.config';
import { TrainingExerciseModule } from './training-exercise/training-exercise.module';
import { TrainingModule } from './training/training.module';
import { RestrictionModule } from './restriction/restriction.module';
import { MuscleGroupModule } from './muscle-group/muscle-group.module';
import { GoalsModule } from './goals/goals.module';
import { GenderModule } from './gender/gender.module';
import { ExerciseModule } from './exercise/exercise.module';

@Module({
  imports: [
    AuthModule,
    MikroOrmModule.forRoot(mikroOrmConfig),
    UserModule,
    TrainingExerciseModule,
    TrainingModule,
    RestrictionModule,
    MuscleGroupModule,
    GoalsModule,
    GenderModule,
    ExerciseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
