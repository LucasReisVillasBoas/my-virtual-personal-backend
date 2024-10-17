import { Injectable } from '@nestjs/common';
import { TrainingRepository } from './training.repository';
import { TrainingTypeRepository } from './training-type.repository';

@Injectable()
export class TrainingService {
  constructor(
    private readonly trainingRepository: TrainingRepository,
    private readonly trainingTypeRepository: TrainingTypeRepository,
  ) {}

  //async getByEmail(email: string): Promise<> {}
}
