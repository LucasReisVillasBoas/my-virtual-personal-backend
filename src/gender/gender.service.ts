import { Injectable } from '@nestjs/common';
import { GenderRepository } from './gender.repository';
import { Gender } from '../entities/gender/gender.entity';

@Injectable()
export class GenderService {
  constructor(private readonly genderRepository: GenderRepository) {}

  async getById(id: string): Promise<Gender> {
    const gender = await this.genderRepository.findOne({ id });
    return gender;
  }
}
