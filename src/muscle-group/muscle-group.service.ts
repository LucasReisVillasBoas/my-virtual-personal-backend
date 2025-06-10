import { BadRequestException, Injectable } from '@nestjs/common';
import { MuscleGroupRepository } from './muscle-group.repository';
import { MuscleGroupResponseDto } from './dto/muscle-group-response.dto';
import { MuscleGroup } from 'src/entities/muscle-group/muscle-group.entity';

@Injectable()
export class MuscleGroupService {
  constructor(private readonly muscleGroupRepository: MuscleGroupRepository) {}

  async getAll(): Promise<MuscleGroupResponseDto[]> {
    const muscleGroupList = await this.muscleGroupRepository.findAll({
      exclude: ['createdAt', 'updatedAt'],
    });
    return muscleGroupList;
  }

  async getById(id: string): Promise<MuscleGroupResponseDto> {
    const muscleGroup = await this.muscleGroupRepository.findOne({ id });
    return muscleGroup;
  }

  async getByCode(code: string): Promise<MuscleGroupResponseDto> {
    const muscleGroup = await this.muscleGroupRepository.findOne({ code });
    return muscleGroup;
  }

  async update(
    id: string,
    updateData: Partial<MuscleGroup>,
  ): Promise<MuscleGroupResponseDto> {
    const muscleGroup = await this.muscleGroupRepository.findOne({ id });

    if (!muscleGroup) {
      throw new BadRequestException('error-muscle-group-not_found');
    }
    Object.assign(muscleGroup, updateData);
    await this.muscleGroupRepository.flush();

    return muscleGroup;
  }

  async delete(id: string): Promise<boolean> {
    const muscleGroup = await this.muscleGroupRepository.findOne({ id });

    if (!muscleGroup) {
      throw new BadRequestException('error-muscle-group-not_found');
    }

    const muscleGroupDeleted = this.muscleGroupRepository.remove(muscleGroup);
    await this.muscleGroupRepository.flush();
    return muscleGroupDeleted != null;
  }
}
