import { Global, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Gender } from '../entities/gender/gender.entity';
import { GenderService } from './gender.service';
import { GenderController } from './gender.controller';

@Global()
@Module({
  imports: [MikroOrmModule.forFeature([Gender])],
  providers: [GenderService],
  controllers: [GenderController],
  exports: [GenderService],
})
export class GenderModule {}
