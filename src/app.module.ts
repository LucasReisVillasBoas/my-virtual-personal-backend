import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserModule } from './user/user.module';
import mikroOrmConfig from './config/mikro-orm.config';

@Module({
  imports: [AuthModule, MikroOrmModule.forRoot(mikroOrmConfig), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
