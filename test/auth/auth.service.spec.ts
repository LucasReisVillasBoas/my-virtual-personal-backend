import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../../src/auth/dto/login.dto';
import { User } from '../../src/entities/user/user.entity';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../../src/user/user.service';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            getByEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateLogin', () => {
    it('should return user if credentials are valid', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };
      const user = new User();
      user.email = 'test@example.com';
      user.password = await bcrypt.hash('password123', 10);

      jest.spyOn(userService, 'getByEmail').mockResolvedValue(user);

      const result = await service.validateLogin(loginDto);
      expect(result).toEqual(user);
    });

    it('should return null if user not found', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      jest.spyOn(userService, 'getByEmail').mockResolvedValue(null);

      const result = await service.validateLogin(loginDto);
      expect(result).toBeNull();
    });

    it('should return null if password is invalid', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };
      const user = new User();
      user.email = 'test@example.com';
      user.password = await bcrypt.hash('password123', 10);

      jest.spyOn(userService, 'getByEmail').mockResolvedValue(user);

      const result = await service.validateLogin(loginDto);
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return a login response with token', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };
      const user = new User();
      user.id = 'someId';
      user.email = 'test@example.com';
      user.password = await bcrypt.hash('password123', 10);

      jest.spyOn(service, 'validateLogin').mockResolvedValue(user);
      jest.spyOn(jwtService, 'sign').mockReturnValue('someToken');

      const result = await service.login(loginDto);
      expect(result.token).toEqual('someToken');
      expect(service.validateLogin).toHaveBeenCalledWith(loginDto);
      expect(jwtService.sign).toHaveBeenCalledWith({
        username: user.email,
        sub: user.id,
      });
    });

    it('should throw BadRequestException if validateLogin returns null', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      jest.spyOn(service, 'validateLogin').mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(
        new BadRequestException('error-user-not_found'),
      );
    });
  });
});
