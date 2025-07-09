import { Test, TestingModule } from '@nestjs/testing';
import { GeminiController } from '../../src/gemini/gemini.controller';
import { GeminiService } from '../../src/gemini/gemini.service';

describe('GeminiController', () => {
  let controller: GeminiController;
  let service: GeminiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeminiController],
      providers: [
        {
          provide: GeminiService,
          useValue: {
            askGemini: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<GeminiController>(GeminiController);
    service = module.get<GeminiService>(GeminiService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('ask', () => {
    it('should return a response from Gemini service', async () => {
      const prompt = 'Hello Gemini';
      const expectedResponse = { response: 'Hello from Gemini!' };
      jest.spyOn(service, 'askGemini').mockResolvedValue(expectedResponse);

      const result = await controller.ask(prompt);

      expect(result).toEqual(expectedResponse);
      expect(service.askGemini).toHaveBeenCalledWith(prompt);
    });
  });
});
