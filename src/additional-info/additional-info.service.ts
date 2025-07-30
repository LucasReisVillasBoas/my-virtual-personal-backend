import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@mikro-orm/nestjs';
import { AdditionalInfo } from 'src/entities/additional-info/additional-info.entity';
import { AdditionalInfoRepository } from 'src/additional-info/additional-info.repository';
import { AdditionalInfoRegisterRequestDto } from 'src/additional-info/dto/additional-info-register-request.dto';

@Injectable()
export class AdditionalInfoService {
  constructor(
    @InjectRepository(AdditionalInfo)
    private readonly additionalInfoRepository: AdditionalInfoRepository,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async register(
    body: AdditionalInfoRegisterRequestDto,
    userId: string,
  ): Promise<AdditionalInfo> {
    const user = await this.userService.getById(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const additionalInfo = this.additionalInfoRepository.create({
      ...body,
      user,
    });

    await this.additionalInfoRepository.flush();
    return additionalInfo;
  }

  async getAll(): Promise<AdditionalInfo[]> {
    const additionalInfos = await this.additionalInfoRepository.findAll();
    if (!additionalInfos || additionalInfos.length === 0) {
      throw new BadRequestException('No Additional Infos found');
    }
    return additionalInfos;
  }

  async getById(id: string): Promise<AdditionalInfo> {
    const additionalInfo = await this.additionalInfoRepository.findOne(id);
    if (!additionalInfo) {
      throw new BadRequestException('Additional Info not found');
    }
    return additionalInfo;
  }

  async update(
    id: string,
    data: Partial<AdditionalInfo>,
  ): Promise<AdditionalInfo> {
    const additionalInfo = await this.additionalInfoRepository.findOne(id);
    if (!additionalInfo) {
      throw new BadRequestException('Additional Info not found');
    }

    Object.assign(additionalInfo, data);
    await this.additionalInfoRepository.flush();
    return additionalInfo;
  }

  async delete(id: string): Promise<boolean> {
    const additionalInfo = await this.additionalInfoRepository.findOne(id);
    if (!additionalInfo) {
      throw new BadRequestException('Additional Info not found');
    }

    const additionalInfoDeleted =
      this.additionalInfoRepository.remove(additionalInfo);
    await this.additionalInfoRepository.flush();
    return additionalInfoDeleted != null;
  }
}
