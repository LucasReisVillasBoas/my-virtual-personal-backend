import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { TrainingExercise } from 'src/entities/training-exercise/training-exercise.entity';
import { ExerciseService } from 'src/exercise/exercise.service';
import { TrainingExerciseResponseData } from 'src/training-exercise/dto/training-exercise-default-response.dto';
import { TrainingExerciseRegisterRequestDto } from 'src/training-exercise/dto/training-exercise-register-request.dto';
import { TrainingService } from 'src/training/training.service';
import { TrainingExerciseRepository } from './training-exercise.repository';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class TrainingExerciseService {
  constructor(
    @InjectRepository(TrainingExercise)
    private readonly trainingExerciseRepository: TrainingExerciseRepository,
     @Inject(forwardRef(() => TrainingService))
        private readonly trainingService: TrainingService,
    private readonly exerciseService: ExerciseService,
  ) {}

  async findAll(): Promise<TrainingExerciseResponseData[]> {
   return await this.trainingExerciseRepository.findAll();
  }

  async findById(id: string): Promise<TrainingExerciseResponseData> {
    const exercises = await this.trainingExerciseRepository.findOne({ id });
    if (!exercises) {
      throw new BadRequestException('Training exercise not found');
    }

    return exercises;
  }

  async create(trainingExerciseData: TrainingExerciseRegisterRequestDto): Promise<TrainingExercise> {
    const training = await this.trainingService.getById(trainingExerciseData.trainingId);
    if (!training) {
      throw new BadRequestException('Training not found');
    }

    const exercise = await this.exerciseService.getByCode(trainingExerciseData.exerciseCode);
    if (!exercise) {
      throw new BadRequestException('Exercise not found');
    }

    const trainingExercise = this.trainingExerciseRepository.create({
      sets: trainingExerciseData.sets,
      reps: trainingExerciseData.reps,
      rest_time: trainingExerciseData.restTime,
      training,
      exercise,
    });
    await this.trainingExerciseRepository.flush();
    return trainingExercise;
  }

  async update(id: string, trainingExerciseData: Partial<TrainingExercise>): Promise<TrainingExerciseResponseData> {
    const trainingExercise = await this.findById(id);
    if (!trainingExercise) {
      throw new Error('Training exercise not found');
    }
    Object.assign(trainingExercise, trainingExerciseData);
    await this.trainingExerciseRepository.flush();
    return trainingExercise;
  }

  async delete(id: string): Promise<boolean> {
    const trainingExercise = await this.findById(id);
    if (!trainingExercise) {
      throw new BadRequestException('Training exercise not found');
    }
    const exercisesDeleted = this.trainingExerciseRepository.remove(trainingExercise);
    await this.trainingExerciseRepository.flush();
    return exercisesDeleted != null;
  }
}
