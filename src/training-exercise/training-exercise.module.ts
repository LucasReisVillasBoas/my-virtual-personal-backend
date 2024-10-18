import { Global, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TrainingExercise } from '../entities/training-exercise/training-exercise.entity';
import { TrainingExerciseService } from './training-exercise.service';
import { TrainingExerciseController } from './training-exercise.controller';

@Global()
@Module({
  imports: [MikroOrmModule.forFeature([TrainingExercise])],
  providers: [TrainingExerciseService],
  controllers: [TrainingExerciseController],
  exports: [TrainingExerciseService],
})
export class TrainingExerciseModule {}
