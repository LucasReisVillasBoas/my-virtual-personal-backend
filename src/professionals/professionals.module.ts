import { forwardRef, Global, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Professionals } from '../entities/professionals/professionals.entity';
import { ProfessionalsController } from './professionals.controller';
import { ProfessionalsService } from '../professionals/professionals.service';
import { ProfessionalsRepository } from 'src/professionals/professionals.repository';
import { UserModule } from 'src/user/user.module';

@Global()
@Module({
  imports: [
    MikroOrmModule.forFeature([Professionals]),
    forwardRef(() => UserModule),
  ],
  providers: [ProfessionalsService, ProfessionalsRepository],
  controllers: [ProfessionalsController],
  exports: [ProfessionalsService],
})
export class ProfessionalsModule {}
