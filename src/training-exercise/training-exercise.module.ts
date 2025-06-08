import { Global, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TrainingModule } from 'src/training/training.module';
import { ExerciseModule } from 'src/exercise/exercise.module';
import { TrainingExercise } from '../entities/training-exercise/training-exercise.entity';
import { TrainingExerciseService } from './training-exercise.service';
import { TrainingExerciseController } from './training-exercise.controller';
import { Training } from 'src/entities/training/training.entity';
import { TrainingExerciseRepository } from './training-exercise.repository';

@Global()
@Module({
    imports: [MikroOrmModule.forFeature([TrainingExercise]), TrainingModule, ExerciseModule],
  providers: [TrainingExerciseService, TrainingExerciseRepository],
  controllers: [TrainingExerciseController],
  exports: [TrainingExerciseService],
})
export class TrainingExerciseModule {}
