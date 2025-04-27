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
import { mapUserRole } from 'src/utils/user.util';
import { ProfessionalRepository } from 'src/professionals/professionals.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly genderService: GenderService,
    private readonly professionalRepository: ProfessionalRepository,
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
    const userExistsRequestDto = new UserExistsRequestDto();
    userExistsRequestDto.email = userRegisterRequestDto.email;

    const userExistsReponseDto = await this.exists(userExistsRequestDto);

    if (userExistsReponseDto.exists) {
      throw new BadRequestException('error-user-exists');
    }

    const gender = await this.genderService.getById(
      userRegisterRequestDto.genderId,
    );

    if (!gender) {
      throw new BadRequestException('error-gender-not_found');
    }

    if (!validateAge(userRegisterRequestDto.age)) {
      throw new BadRequestException('error-user-age-invalid');
    }

    if (!validateWeight(userRegisterRequestDto.weight)) {
      throw new BadRequestException('error-user-weight-invalid');
    }

    if (!validateHeight(userRegisterRequestDto.height)) {
      throw new BadRequestException('error-user-height-invalid');
    }

    /* encrypt password */

    const user = this.userRepository.create({
      password: userRegisterRequestDto.password,
      email: userRegisterRequestDto.email,
      fullName: userRegisterRequestDto.fullName,
      nickname: userRegisterRequestDto.nickname,
      age: userRegisterRequestDto.age,
      height: userRegisterRequestDto.height,
      weight: parseFloat(
        userRegisterRequestDto.weight.replace(',', '.'),
      ).toString(),
      gender,
      role: mapUserRole(userRegisterRequestDto.role),
      professionals: userRegisterRequestDto.professionals_id
        ? userRegisterRequestDto.professionals_id
        : [],
    });

    if (
      userRegisterRequestDto.role === 'personal_trainer' ||
      userRegisterRequestDto.role === 'nutritionist'
    ) {
      this.professionalRepository.create({
        name: userRegisterRequestDto.fullName,
        type: mapUserRole(userRegisterRequestDto.role),
      });
    }

    await this.userRepository.flush();
    await this.professionalRepository.flush();

    return user;
  }
}
