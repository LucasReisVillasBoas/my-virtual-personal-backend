import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from 'src/entities/user/user.entity';
import { UserExistsResponseDto } from './dto/user-exists-response.dto';
import { UserExistsRequestDto } from './dto/user-exists-request.dto';
import { UserRegisterRequestDto } from './dto/user-register-request.dto';
import { GenderService } from '../gender/gender.service';
import {
  validateAge,
  validateHeight,
  validateWeight,
} from '../utils/validation-user.util';
import * as bcrypt from 'bcryptjs';
import { validatePassword } from '../utils/auth.util';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly genderService: GenderService,
  ) {}
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

  async register(
    userRegisterRequestDto: UserRegisterRequestDto,
  ): Promise<User> {
    await this.handleUser(userRegisterRequestDto);

    const gender = await this.genderService.getById(
      userRegisterRequestDto.genderId,
    );
    if (!gender) {
      throw new BadRequestException('error-gender-not_found');
    }

    const hashedPassword = await this.hashPassword(
      userRegisterRequestDto.password,
    );

    const user = this.userRepository.create({
      password: hashedPassword,
      email: userRegisterRequestDto.email,
      fullName: userRegisterRequestDto.fullName,
      nickname: userRegisterRequestDto.nickname,
      age: userRegisterRequestDto.age,
      height: userRegisterRequestDto.height,
      weight: parseFloat(
        userRegisterRequestDto.weight.replace(',', '.'),
      ).toString(),
      gender,
    });

    await this.userRepository.flush();

    return user;
  }

  private async checkIfUserExists(email: string): Promise<void> {
    const userExistsRequestDto = new UserExistsRequestDto();
    userExistsRequestDto.email = email;

    const userExistsResponseDto = await this.exists(userExistsRequestDto);
    if (userExistsResponseDto.exists) {
      throw new BadRequestException('error-user-exists');
    }
  }

  private validateAnthropometricData(user: UserRegisterRequestDto) {
    if (!validateAge(user.age)) {
      throw new BadRequestException('error-user-age-invalid');
    }

    if (!validateWeight(user.weight)) {
      throw new BadRequestException('error-user-weight-invalid');
    }

    if (!validateHeight(user.height)) {
      throw new BadRequestException('error-user-height-invalid');
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  private async handleUser(user: UserRegisterRequestDto) {
    this.checkIfUserExists(user.email);

    this.validateAnthropometricData(user);

    if (!validatePassword(user.password)) {
      throw new BadRequestException('error-user-password-invalid');
    }
  }
}
