import { Injectable } from '@nestjs/common';
import { MuscleGroupRepository } from './muscle-group.repository';
import { MuscleGroupResponseDto } from './dto/muscle-group-response.dto';

@Injectable()
export class MuscleGroupService {
  constructor(private readonly muscleGroupRepository: MuscleGroupRepository) {}

  async getAll(): Promise<MuscleGroupResponseDto[]> {
    const muscleGroupList = await this.muscleGroupRepository.findAll({
      exclude: ['createdAt', 'updatedAt'],
    });
    return muscleGroupList;
  }
}
