import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../src/user/user.service';
import { UserRepository } from '../../src/user/user.repository';
import { GenderService } from '../../src/gender/gender.service';
import { ProfessionalsService } from '../../src/professionals/professionals.service';
import { User } from '../../src/entities/user/user.entity';
import { BadRequestException } from '@nestjs/common';
import { UserExistsRequestDto } from '../../src/user/dto/user-exists-request.dto';
import { UserRegisterRequestDto } from '../../src/user/dto/user-register-request.dto';
import { Gender } from '../../src/entities/gender/gender.entity';
import * as bcrypt from 'bcryptjs';
import * as UserUtil from '../../src/utils/user.util';
import * as ValidationUserUtil from '../../src/utils/validation-user.util';
import * as AuthUtil from '../../src/utils/auth.util';
import { UserRole } from '../../src/entities/user/user-role';

describe('UserService', () => {
  let service: UserService;
  let userRepository: UserRepository;
  let genderService: GenderService;
  let professionalsService: ProfessionalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            flush: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: GenderService,
          useValue: {
            getById: jest.fn(),
          },
        },
        {
          provide: ProfessionalsService,
          useValue: {
            register: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
    genderService = module.get<GenderService>(GenderService);
    professionalsService = module.get<ProfessionalsService>(ProfessionalsService);

    jest.spyOn(UserUtil, 'mapUserRole').mockImplementation((role) => UserRole.USER);
    jest.spyOn(ValidationUserUtil, 'validateAge').mockReturnValue(true);
    jest.spyOn(ValidationUserUtil, 'validateHeight').mockReturnValue(true);
    jest.spyOn(ValidationUserUtil, 'validateWeight').mockReturnValue(true);
    jest.spyOn(AuthUtil, 'validatePassword').mockReturnValue(true);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of users', async () => {
      const users = [new User(), new User()];
      jest.spyOn(userRepository, 'findAll').mockResolvedValue(users);
      expect(await service.getAll()).toEqual(users);
    });
  });

  describe('getByEmail', () => {
    it('should return a user by email', async () => {
      const user = new User();
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      expect(await service.getByEmail('test@example.com')).toEqual(user);
    });
  });

  describe('getById', () => {
    it('should return a user by id', async () => {
      const user = new User();
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      expect(await service.getById('someId')).toEqual(user);
    });
  });

  describe('exists', () => {
    it('should return true if user exists', async () => {
      const userExistsRequestDto: UserExistsRequestDto = { email: 'test@example.com' };
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(new User());
      const result = await service.exists(userExistsRequestDto);
      expect(result.exists).toBe(true);
    });

    it('should return false if user does not exist', async () => {
      const userExistsRequestDto: UserExistsRequestDto = { email: 'test@example.com' };
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
      const result = await service.exists(userExistsRequestDto);
      expect(result.exists).toBe(false);
    });
  });

  describe('register', () => {
    let userRegisterRequestDto: UserRegisterRequestDto;
    let gender: Gender;

    beforeEach(() => {
      userRegisterRequestDto = {
        email: 'newuser@example.com',
        password: 'password123',
        fullName: 'New User',
        nickname: 'Newbie',
        age: "25",
        height: "170",
        weight: '70,5',
        genderId: 'genderId1',
        role: 'client',
        professionals_id: [],
        clients_id: [],
      };
      gender = new Gender();
      gender.id = 'genderId1';
      gender.code = 'MM';

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
      jest.spyOn(genderService, 'getById').mockResolvedValue(gender);
      jest.spyOn(userRepository, 'create').mockImplementation((data) => {
        const user = new User();
        Object.assign(user, data);
        return user;
      });
    });

    it('should register a new client user successfully', async () => {
      const result = await service.register(userRegisterRequestDto);

      expect(result).toBeInstanceOf(User);
      expect(result.email).toEqual('newuser@example.com');
      expect(userRepository.flush).toHaveBeenCalled();
    });

    it('should register a new professional user successfully', async () => {
      userRegisterRequestDto.role = 'personal_trainer';
      userRegisterRequestDto.clients_id = ['clientId1'];

      const clientUser = new User();
      clientUser.id = 'clientId1';
      jest.spyOn(userRepository, 'findOne')
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(clientUser);

      const result = await service.register(userRegisterRequestDto);

      expect(result).toBeInstanceOf(User);
      expect(professionalsService.register).toHaveBeenCalledWith(
        expect.any(User),
        [clientUser],
      );
      expect(userRepository.flush).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update a user successfully', async () => {
      const user = new User();
      user.id = 'someId';
      user.fullName = 'Old Name';
      const updatedData = { fullName: 'New Name' };

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      jest.spyOn(userRepository, 'flush').mockResolvedValue(undefined);

      const result = await service.update('someId', updatedData);
      expect(result.fullName).toEqual('New Name');
      expect(userRepository.flush).toHaveBeenCalled();
    });

    it('should throw BadRequestException if user not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
      await expect(service.update('nonExistentId', {})).rejects.toThrow(
        new BadRequestException('error-user-not_found'),
      );
    });
  });

  describe('delete', () => {
    it('should delete a user successfully', async () => {
      const user = new User();
      user.id = 'someId';

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      jest.spyOn(userRepository, 'remove').mockReturnValue(undefined);
      jest.spyOn(userRepository, 'flush').mockResolvedValue(undefined);

      const result = await service.delete('someId');
      expect(!result).toBe(true);
      expect(userRepository.remove).toHaveBeenCalledWith(user);
      expect(userRepository.flush).toHaveBeenCalled();
    });

    it('should throw BadRequestException if user not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
      await expect(service.delete('nonExistentId')).rejects.toThrow(
        new BadRequestException('error-user-not_found'),
      );
    });
  });
});
