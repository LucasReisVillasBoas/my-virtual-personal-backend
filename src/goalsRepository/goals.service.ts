import { Injectable } from '@nestjs/common';
import { GoalsRepository } from './goals.repository';

@Injectable()
export class GoalsService {
  constructor(private readonly goalsRepository: GoalsRepository) {}

  //async getByEmail(email: string): Promise<> {}
}
