import { Controller, Post, Body } from '@nestjs/common';
import { GeminiService } from './gemini.service';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('ask')
  async ask(@Body('prompt') prompt: string): Promise<{ response: string }> {
    const response = await this.geminiService.askGemini(prompt);

    for (let i = 0; i < response.length; i++) {
      console.log(response[i]);
      // if (response[i] === '{') {
      //   do {
          
      //   } while (response[i] === '}');
      // }
    }

    return response;
  }
}
