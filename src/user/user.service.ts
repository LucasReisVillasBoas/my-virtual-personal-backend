import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
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
import { ProfessionalsService } from 'src/professionals/professionals.service';
import * as bcrypt from 'bcryptjs';
import { validatePassword } from '../utils/auth.util';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly genderService: GenderService,
    @Inject(forwardRef(() => ProfessionalsService))
    private readonly professionalsService: ProfessionalsService,
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
      role: mapUserRole(userRegisterRequestDto.role),
      professionals: userRegisterRequestDto.professionals_id
        ? userRegisterRequestDto.professionals_id
        : [],
    });

    if (
      userRegisterRequestDto.role === 'personal_trainer' ||
      userRegisterRequestDto.role === 'nutritionist'
    ) {
      const clients: User[] = [];
      if (
        userRegisterRequestDto.clients_id &&
        userRegisterRequestDto.clients_id.length > 0
      ) {
        for (const clientId of userRegisterRequestDto.clients_id) {
          const client = await this.userRepository.findOne({
            id: clientId,
          });
          if (client) {
            clients.push(client);
          } else {
            throw new BadRequestException('error-client-not-found');
          }
        }
      }

      await this.professionalsService.register(user, clients);
    }

    await this.userRepository.flush();

    return user;
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const user = await this.userRepository.findOne({ id });

    if (!user) {
      throw new BadRequestException('error-user-not_found');
    }

    Object.assign(user, data);
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
