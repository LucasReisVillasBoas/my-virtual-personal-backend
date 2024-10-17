import { Injectable } from '@nestjs/common';
import { GenderRepository } from './gender.repository';

@Injectable()
export class GenderService {
  constructor(private readonly genderRepository: GenderRepository) {}

  //async getByEmail(email: string): Promise<> {}
}
