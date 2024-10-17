import { Injectable } from '@nestjs/common';
import { TrainingExerciseRepository } from './training-exercise.repository';

@Injectable()
export class TrainingExerciseService {
  constructor(
    private readonly trainingExerciseRepository: TrainingExerciseRepository,
  ) {}

  //async getByEmail(email: string): Promise<> {}
}
