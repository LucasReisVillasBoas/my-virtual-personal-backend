import { forwardRef, Global, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserModule } from '../user/user.module';
import { AdditionalInfo } from '../entities/additional-info/additional-info.entity';
import { AdditionalInfoRepository } from '../additional-info/additional-info.repository';
import { AdditionalInfoController } from '../additional-info/additional-info.controller';
import { AdditionalInfoService } from '../additional-info/additional-info.service';

@Global()
@Module({
  imports: [
    MikroOrmModule.forFeature([AdditionalInfo]),
    forwardRef(() => UserModule),
  ],
  providers: [AdditionalInfoService, AdditionalInfoRepository],
  controllers: [AdditionalInfoController],
  exports: [AdditionalInfoService],
})
export class AdditionalInfoModule {}
