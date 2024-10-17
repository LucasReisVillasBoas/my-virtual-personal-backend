import { Global, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Restriction } from '../entities/restriction/restriction.entity';
import { RestrictionService } from './restriction.service';
import { RestrictionController } from './restriction.controller';

@Global()
@Module({
  imports: [MikroOrmModule.forFeature([Restriction])],
  providers: [RestrictionService],
  controllers: [RestrictionController],
  exports: [RestrictionService],
})
export class RestrictionModule {}
