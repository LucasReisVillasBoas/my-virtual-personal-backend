import { BadRequestException, Injectable } from '@nestjs/common';
import { Training } from '../entities/training/training.entity';
import { GoalsService } from '../goals/goals.service';
import { TrainingRegisterRequestDto } from '../training/dto/training-register-request.dto';
import { TrainingResponseData } from '../training/dto/training-response.dto';
import { UserService } from '../user/user.service';
import { TrainingTypeResponseDto } from './dto/training-type-response.dto';
import { TrainingTypeRepository } from './training-type.repository';
import { TrainingRepository } from './training.repository';
import { TrainingExerciseService } from '../training-exercise/training-exercise.service';

@Injectable()
export class TrainingService {
  constructor(
    private readonly trainingRepository: TrainingRepository,
    private readonly trainingTypeRepository: TrainingTypeRepository,
    private readonly userRepository: UserService,
    private readonly goalsRepository: GoalsService,
    private readonly trainingExerciseService: TrainingExerciseService,
  ) {}

  async register(
    trainingRegisterRequestDto: TrainingRegisterRequestDto,
  ): Promise<Training> {
    const user = await this.userRepository.getById(
      trainingRegisterRequestDto.userId,
    );
    if (!user) {
      throw new BadRequestException('error-user-not_found');
    }

    const goals = await this.goalsRepository.getById(
      trainingRegisterRequestDto.goalsId,
    );
    if (!goals) {
      throw new BadRequestException('error-goals-not_found');
    }

    const trainingType = await this.trainingTypeRepository.findOne({
      code: trainingRegisterRequestDto.trainingType,
    });

    if (!trainingType) {
      throw new BadRequestException('error-training_type-not_found');
    }

    const training = this.trainingRepository.create({
      active: trainingRegisterRequestDto.active,
      trainingType,
      goals,
      user,
    });

    if (trainingRegisterRequestDto.trainingExerciseList.length > 0) {
      const trainingExerciseList =
        trainingRegisterRequestDto.trainingExerciseList;
      trainingExerciseList.forEach((exercise) => {
        return this.trainingExerciseService.create({
          sets: exercise.sets,
          reps: exercise.reps,
          restTime: exercise.rest_time,
          trainingId: training.id,
          exerciseCode: exercise.exercise.code,
        });
      });
    }

    await this.trainingRepository.flush();
    return training;
  }

  async getAllByType(typeId: string): Promise<TrainingTypeResponseDto[]> {
    const trainingTypeList = await this.trainingTypeRepository.find({ code: typeId });
    return trainingTypeList;
  }

  async getAll(): Promise<TrainingResponseData[]> {
    const trainingList = await this.trainingRepository.findAll();
    return trainingList;
  }

  async getById(id: string): Promise<TrainingResponseData> {
    const training = await this.trainingRepository.findOne({ id });
    if (!training) {
      throw new BadRequestException('error-training-not_found');
    }
    return training;
  }

  async update(
    id: string,
    data: Partial<Training>,
  ): Promise<TrainingResponseData> {
    const training = await this.getById(id);
    if (!training) {
      throw new BadRequestException('error-training-not_found');
    }

    if (data.trainingExerciseList && data.trainingExerciseList.length > 0) {
      const trainingExerciseList = data.trainingExerciseList;
      trainingExerciseList.forEach((exercise) => {
        return this.trainingExerciseService.create({
          sets: exercise.sets,
          reps: exercise.reps,
          restTime: exercise.rest_time,
          trainingId: training.id,
          exerciseCode: exercise.exercise.code,
        });
      });

      return training;
    }

    Object.assign(training, data);
    await this.trainingRepository.flush();

    return training;
  }

  async delete(id: string): Promise<boolean> {
    const training = await this.getById(id);
    if (!training) {
      throw new BadRequestException('error-training-not_found');
    }

    const trainingDeleted = this.trainingRepository.remove(training);
    await this.trainingRepository.flush();
    return trainingDeleted != null;
  }
}
