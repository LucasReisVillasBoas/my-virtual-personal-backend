import { BadRequestException, Injectable } from '@nestjs/common';
import { ExerciseRepository } from './exercise.repository';
import { ExerciseResponseDto } from './dto/exercise-response.dto';
import { ExerciseRegisterRequestDto } from 'src/exercise/dto/exercise-register-request.dto';
import { Exercise } from 'src/entities/exercise/exercise.entity';
import { MuscleGroupService } from 'src/muscle-group/muscle-group.service';
import { generateCode } from 'src/utils/exercise.util';

@Injectable()
export class ExerciseService {
  constructor(
    private readonly exerciseRepository: ExerciseRepository,
    private readonly muscleGroupService: MuscleGroupService,
  ) {}

  async register(
    exerciseRegisterRequest: ExerciseRegisterRequestDto,
  ): Promise<Exercise> {
    const muscleGroup = await this.muscleGroupService.getByCode(
      exerciseRegisterRequest.muscleGroupCode,
    );
    if (!muscleGroup) {
      throw new BadRequestException('error-muscle-group-not_found');
    }

    const code = generateCode(
      muscleGroup.description,
      exerciseRegisterRequest.type,
      exerciseRegisterRequest.description,
    );
    const newExercise = this.exerciseRepository.create({
      code,
      description: exerciseRegisterRequest.description,
      muscleGroup: muscleGroup,
    });

    await this.exerciseRepository.flush();
    return newExercise;
  }

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
