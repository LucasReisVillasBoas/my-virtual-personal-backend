import { Global, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Training } from '../entities/training/training.entity';
import { TrainingService } from './training.service';
import { TrainingController } from './training.controller';
import { TrainingType } from '../entities/training/training-type.entity';

@Global()
@Module({
  imports: [MikroOrmModule.forFeature([Training, TrainingType])],
  providers: [TrainingService],
  controllers: [TrainingController],
  exports: [TrainingService],
})
export class TrainingModule {}
