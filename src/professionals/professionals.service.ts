import { Injectable } from '@nestjs/common';
import { Professionals } from '../entities/professionals/professionals.entity';
import { ProfessionalRepository } from './professionals.repository';
import { User } from 'src/entities/user/user.entity';

@Injectable()
export class ProfessionalService {
  constructor(
    private readonly professionalRepository: ProfessionalRepository,
  ) {}

  async getById(id: string): Promise<Professionals> {
    const professional = await this.professionalRepository.findOne({ id });
    return professional;
  }

  async register(user: User, clients: User[]): Promise<void> {
    this.professionalRepository.create({
      name: user.fullName,
      type: user.role,
      users: clients,
    });

    await this.professionalRepository.flush();
  }
}
