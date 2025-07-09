import { BadRequestException, Injectable } from '@nestjs/common';
import { RestrictionRepository } from './restriction.repository';
import { RestrictionRegisterRequestDto } from '../restriction/dto/restriction-register-request.dto';
import { Restriction } from '../entities/restriction/restriction.entity';
import { RestrictionResponseDto } from '../restriction/dto/restriction-response.dto';
import { generateRestrictionCode } from '../utils/restriction.util';

@Injectable()
export class RestrictionService {
  constructor(private readonly restrictionRepository: RestrictionRepository) {}

  async register(
    restrictionRegisterRequestDto: RestrictionRegisterRequestDto,
  ): Promise<Restriction> {
    const existingRestriction = await this.restrictionRepository.findAll();
    const code = generateRestrictionCode(restrictionRegisterRequestDto.code, existingRestriction);

    const restriction = this.restrictionRepository.create({
      code: code,
      description: restrictionRegisterRequestDto.description,
    });

    await this.restrictionRepository.flush();
    return restriction;
  }

  async getAll(): Promise<RestrictionResponseDto[]> {
    return this.restrictionRepository.findAll();
  }

  async getById(id: string): Promise<RestrictionResponseDto> {
    return this.restrictionRepository.findOne({ id });
  }

  async update(
    id: string,
    data: Partial<Restriction>,
  ): Promise<RestrictionResponseDto> {
    const restriction = await this.getById(id);
    if (!restriction) {
      throw new BadRequestException('error-restriction-not_found');
    }

    Object.assign(restriction, data);
    await this.restrictionRepository.flush();

    return restriction;
  }

  async delete(id: string): Promise<boolean> {
    const restriction = await this.getById(id);
    if (!restriction) {
      throw new BadRequestException('error-restriction-not_found');
    }

    const restrictionDeleted = this.restrictionRepository.remove(restriction);
    await this.restrictionRepository.flush();
    return restrictionDeleted != null;
  }
}
