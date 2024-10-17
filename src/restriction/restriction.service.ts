import { Injectable } from '@nestjs/common';
import { RestrictionRepository } from './restriction.repository';

@Injectable()
export class RestrictionService {
  constructor(private readonly restrictionRepository: RestrictionRepository) {}

  //async getByEmail(email: string): Promise<> {}
}
