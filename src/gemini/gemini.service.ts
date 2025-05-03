import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class GeminiService {
  constructor(private readonly httpService: HttpService) {}

  async askGemini(prompt2: string): Promise<any> {
    console.log(prompt2);
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `List a few popular cookie recipes using this JSON schema:

    Recipe = {'recipeName': string}
    Return: Array<Recipe>`;

    const result = await model.generateContent(prompt);
    return result.response.candidates[0].content.parts[0].text;
    /**
    const url = 'https://api.gemini.com/v1/generateContent';

    const payload = {
      model: 'gemini-1.5-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 100,
        temperature: 0.7,
      },
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, payload),
      );
      return response.data.response.text();
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw new Error('Failed to get response from Gemini API.');
    }
   */
  }
}
