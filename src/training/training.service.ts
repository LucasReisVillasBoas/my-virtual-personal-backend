import { Injectable } from '@nestjs/common';
import { TrainingRepository } from './training.repository';
import { TrainingTypeRepository } from './training-type.repository';
import { TrainingTypeResponseDto } from './dto/training-type-response.dto';

@Injectable()
export class TrainingService {
  constructor(
    private readonly trainingRepository: TrainingRepository,
    private readonly trainingTypeRepository: TrainingTypeRepository,
  ) {}

  async getAll(): Promise<TrainingTypeResponseDto[]> {
    const trainingTypeList = await this.trainingTypeRepository.findAll({
      exclude: ['createdAt', 'updatedAt'],
    });
    return trainingTypeList;
  }
}
