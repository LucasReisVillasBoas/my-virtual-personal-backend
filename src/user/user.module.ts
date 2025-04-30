import { forwardRef, Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from 'src/entities/user/user.entity';
import { ProfessionalsModule } from 'src/professionals/professionals.module';

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
