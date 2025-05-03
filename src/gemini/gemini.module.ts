import { Module } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { HttpModule } from '@nestjs/axios';
import { GeminiController } from './gemini.controller';

@Module({
  imports: [HttpModule],
  providers: [GeminiService],
  controllers: [GeminiController],
  exports: [GeminiService],
})
export class GeminiModule {}
