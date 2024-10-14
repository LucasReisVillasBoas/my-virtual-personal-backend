import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from 'src/entities/user';

@Global()
@Module({
  imports: [MikroOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
