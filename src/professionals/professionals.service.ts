import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Professionals } from '../entities/professionals/professionals.entity';
import { User } from 'src/entities/user/user.entity';
import { UserRegisterRequestDto } from 'src/professionals/dto/user-register-request.dto';
import { UserExistsRequestDto } from 'src/user/dto/user-exists-request.dto';
import { UserService } from '../user/user.service';
import { ProfessionalsRepository } from './professionals.repository';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class ProfessionalsService {
  constructor(
    @InjectRepository(Professionals)
    private readonly professionalsRepository: ProfessionalsRepository,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async getById(id: string): Promise<Professionals> {
    const professional = await this.professionalsRepository.findOne({ id });
    return professional;
  }

  async register(user: User, clients: User[]): Promise<void> {
    this.professionalsRepository.create({
      name: user.fullName,
      type: user.role,
      users: clients,
    });

    await this.professionalsRepository.flush();
  }

  async addUser(
    userRequestDto: UserRegisterRequestDto,
    professionalId: string,
  ): Promise<void> {
    const professional = await this.getById(professionalId);
    if (!professional) {
      throw new BadRequestException('error-professional-not_found');
    }

    const userExistsRequestDto = new UserExistsRequestDto();
    userExistsRequestDto.email = userRequestDto.email;
    const userExists = await this.userService.exists(userExistsRequestDto);
    if (userExists.exists) {
      const user = await this.userService.getByEmail(userRequestDto.email);
      professional.users.add(user);
      await this.professionalsRepository.flush();
    } else {
      userRequestDto.professionals_id = [professionalId];
      await this.userService.register(userRequestDto);
    }
  }

  async update(
    id: string,
    data: Partial<Professionals>,
  ): Promise<Professionals> {
    const professional = await this.professionalsRepository.findOne({ id });

    if (!professional) {
      throw new BadRequestException('error-professional-not_found');
    }

    Object.assign(professional, data);
    await this.professionalsRepository.flush();

    return professional;
  }
}
