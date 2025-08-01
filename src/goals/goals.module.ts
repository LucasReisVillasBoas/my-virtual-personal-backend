import { forwardRef, Global, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Goals } from '../entities/goals/goals.entity';
import { GoalsService } from './goals.service';
import { GoalsController } from './goals.controller';
import { UserModule } from 'src/user/user.module';

@Global()
@Module({
  imports: [MikroOrmModule.forFeature([Goals])],
  providers: [GoalsService],
  controllers: [GoalsController],
  exports: [GoalsService],
})
export class GoalsModule {}
