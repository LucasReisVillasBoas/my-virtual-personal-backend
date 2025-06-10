import { BadRequestException, Injectable } from '@nestjs/common';
import { ExerciseRepository } from './exercise.repository';
import { ExerciseResponseDto } from './dto/exercise-response.dto';

@Injectable()
export class ExerciseService {
  constructor(private readonly exerciseRepository: ExerciseRepository) {}

  async getAll(): Promise<ExerciseResponseDto[]> {
    const exerciseList = await this.exerciseRepository.getAll();
    return exerciseList;
  }

  async getById(id: string): Promise<ExerciseResponseDto> {
    const exercise = await this.exerciseRepository.findOne({ id });
    return exercise;
  }

  async getByCode(code: string): Promise<ExerciseResponseDto> {
    const exercise = await this.exerciseRepository.findOne({ code });
    return exercise;
  }

  async update(
    id: string,
    updateData: Partial<ExerciseResponseDto>,
  ): Promise<ExerciseResponseDto> {
    const exercise = await this.exerciseRepository.findOne({ id });
    
        if (!exercise) {
          throw new BadRequestException('error-exercise-not_found');
        }
        Object.assign(exercise, updateData);
        await this.exerciseRepository.flush();
    
        return exercise;
  }

  async delete(id: string): Promise<boolean> {
    const exercise = await this.exerciseRepository.findOne({ id });

    if (!exercise) {
      throw new BadRequestException('error-exercise-not_found');
    }

    const exerciseDeleted = this.exerciseRepository.remove(exercise);
    await this.exerciseRepository.flush();
    return exerciseDeleted != null;
  }
}
