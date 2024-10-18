import { Global, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MuscleGroup } from '../entities/muscle-group/muscle-group.entity';
import { MuscleGroupService } from './muscle-group.service';
import { MuscleGroupController } from './muscle-group.controller';

@Global()
@Module({
  imports: [MikroOrmModule.forFeature([MuscleGroup])],
  providers: [MuscleGroupService],
  controllers: [MuscleGroupController],
  exports: [MuscleGroupService],
})
export class MuscleGroupModule {}
