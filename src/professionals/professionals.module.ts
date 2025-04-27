import { Global, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Professionals } from '../entities/professionals/professionals.entity';
import { ProfessinalsController } from './professionals.controller';
import { ProfessionalService } from '../professionals/professionals.service';

@Global()
@Module({
  imports: [MikroOrmModule.forFeature([Professionals])],
  providers: [ProfessionalService],
  controllers: [ProfessinalsController],
  exports: [ProfessionalService],
})
export class ProfessionalModule {}
