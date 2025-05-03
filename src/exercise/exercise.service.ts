import { Injectable } from '@nestjs/common';
import { ExerciseRepository } from './exercise.repository';
import { ExerciseResponseDto } from './dto/exercise-response.dto';

@Injectable()
export class ExerciseService {
  constructor(private readonly exerciseRepository: ExerciseRepository) {}

  async getAll(): Promise<ExerciseResponseDto[]> {
    const exerciseList = await this.exerciseRepository.getAll();
    return exerciseList;
  }
}
