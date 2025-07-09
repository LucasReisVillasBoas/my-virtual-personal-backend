import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../src/auth/auth.controller';
import { LoginDto } from '../../src/auth/dto/login.dto';
import { LoginResponseDto } from '../../src/auth/dto/login-response.dto';
import { AuthService } from '../../src/auth/auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return a login response', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };
      const expectedResult: LoginResponseDto = {
        token: 'someAccessToken',
      };

      jest.spyOn(service, 'login').mockResolvedValue(expectedResult);

      const req: any = {};
      const result = await controller.login(req, loginDto);

      expect(result).toEqual(expectedResult);
      expect(service.login).toHaveBeenCalledWith(loginDto);
    });
  });
});
