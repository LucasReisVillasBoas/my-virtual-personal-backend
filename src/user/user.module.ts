import { forwardRef, Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '../entities/user/user.entity';
import { ProfessionalsModule } from '../professionals/professionals.module';

@Global()
@Module({
  imports: [
    MikroOrmModule.forFeature([User]),
    forwardRef(() => ProfessionalsModule),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
