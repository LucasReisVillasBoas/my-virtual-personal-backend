import { Test, TestingModule } from '@nestjs/testing';
import { GeminiService } from '../../src/gemini/gemini.service';
import { HttpService } from '@nestjs/axios';
import { GoogleGenerativeAI } from '@google/generative-ai';

jest.mock('@google/generative-ai', () => {
  return {
    GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
      getGenerativeModel: jest.fn().mockReturnValue({
        generateContent: jest.fn().mockResolvedValue({
          response: {
            candidates: [{ content: { parts: [{ text: 'Mocked Gemini Response' }] } }],
          },
        }),
      }),
    })),
  };
});

describe('GeminiService', () => {
  let service: GeminiService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GeminiService,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<GeminiService>(GeminiService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('askGemini', () => {
    it('should return a response from Gemini API using GoogleGenerativeAI', async () => {
      const prompt = 'Test prompt';
      const expectedResponse = 'Mocked Gemini Response';

      const result = await service.askGemini(prompt);

      expect(result).toEqual(expectedResponse);
      expect(GoogleGenerativeAI).toHaveBeenCalledWith(process.env.GEMINI_API_KEY);
    });
  });
});
