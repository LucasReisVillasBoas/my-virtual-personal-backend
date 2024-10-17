import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from 'src/entities/user/user.entity';
import { UserExistsResponseDto } from './dto/user-exists-response.dto';
import { UserExistsRequestDto } from './dto/user-exists-request.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getByEmail(email: string): Promise<User> {
    const person = await this.userRepository.findOne({ email });
    return person;
  }

  async exists(
    userExistsRequestDto: UserExistsRequestDto,
  ): Promise<UserExistsResponseDto> {
    const person = await this.getByEmail(userExistsRequestDto.email);
    const result = new UserExistsResponseDto();
    result.exists = person != null;
    return result;
  }
}
