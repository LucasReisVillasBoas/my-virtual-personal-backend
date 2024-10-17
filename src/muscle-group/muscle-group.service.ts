import { Injectable } from '@nestjs/common';
import { MuscleGroupRepository } from './muscle-group.repository';

@Injectable()
export class MuscleGroupService {
  constructor(private readonly muscleGroupRepository: MuscleGroupRepository) {}

  //async getByEmail(email: string): Promise<> {}
}
