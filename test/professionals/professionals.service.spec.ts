import { Test, TestingModule } from '@nestjs/testing';
import { ProfessionalsService } from '../../src/professionals/professionals.service';
import { ProfessionalsRepository } from '../../src/professionals/professionals.repository';
import { UserService } from '../../src/user/user.service';
import { Professionals } from '../../src/entities/professionals/professionals.entity';
import { User } from '../../src/entities/user/user.entity';
import { BadRequestException, forwardRef } from '@nestjs/common';
import { UserRegisterRequestDto } from '../../src/user/dto/user-register-request.dto';
import { UserExistsResponseDto } from '../../src/user/dto/user-exists-response.dto';
import { UserRole } from '../../src/entities/user/user-role';
import { getRepositoryToken } from '@mikro-orm/nestjs';

describe('ProfessionalsService', () => {
  let service: ProfessionalsService;
  let professionalsRepository: ProfessionalsRepository;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfessionalsService,
        {
          provide: getRepositoryToken(Professionals),
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            flush: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            getById: jest.fn(),
            exists: jest.fn(),
            getByEmail: jest.fn(),
            register: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProfessionalsService>(ProfessionalsService);
    professionalsRepository = module.get(getRepositoryToken(Professionals));
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of professionals', async () => {
      const professionals = [new Professionals(), new Professionals()];
      jest
        .spyOn(professionalsRepository, 'findAll')
        .mockResolvedValue(professionals);
      expect(await service.getAll()).toEqual(professionals);
    });
  });

  describe('getById', () => {
    it('should return a professional by id', async () => {
      const professional = new Professionals();
      jest
        .spyOn(professionalsRepository, 'findOne')
        .mockResolvedValue(professional);
      expect(await service.getById('someId')).toEqual(professional);
    });
  });

  describe('register', () => {
    it('should register a new professional successfully', async () => {
      const user = new User();
      user.fullName = 'Test Professional';
      user.email = 'pro@example.com';
      user.role = UserRole.PERSONAL_TRAINER;
      const clients: User[] = [new User()];

      jest
        .spyOn(professionalsRepository, 'create')
        .mockImplementation((data) => {
          const professional = new Professionals();
          Object.assign(professional, data);
          return professional;
        });
      jest.spyOn(professionalsRepository, 'flush').mockResolvedValue(undefined);

      await service.register(user, clients);

      expect(professionalsRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          name: user.fullName,
          email: user.email,
          type: user.role,
          users: clients,
        }),
      );
      expect(professionalsRepository.flush).toHaveBeenCalled();
    });
  });

  describe('addUser', () => {
    let userRegisterDto: UserRegisterRequestDto;
    let professional: Professionals;
    let userExistsResponse: UserExistsResponseDto;
    let existingUser: User;
    let newUser: User;

    beforeEach(() => {
      userRegisterDto = {
        email: 'newclient@example.com',
        password: 'password123',
        fullName: 'New Client',
        nickname: 'Client',
        age: '25',
        height: '170',
        weight: '65.0',
        genderId: 'genderId',
        role: 'client',
        professionals_id: [],
        clients_id: [],
      };
      professional = new Professionals();
      professional.id = 'proId';
      professional.users = { add: jest.fn() } as any;

      userExistsResponse = new UserExistsResponseDto();
      existingUser = new User();
      existingUser.id = 'existingUserId';
      existingUser.email = 'newclient@example.com';

      newUser = new User();
      newUser.id = 'newlyCreatedUserId';
      newUser.email = 'newclient@example.com';

      jest.spyOn(service, 'getById').mockResolvedValue(professional);
      jest.spyOn(professionalsRepository, 'flush').mockResolvedValue(undefined);
    });

    it('should add an existing user to professional', async () => {
      userExistsResponse.exists = true;
      jest.spyOn(userService, 'exists').mockResolvedValue(userExistsResponse);
      jest.spyOn(userService, 'getByEmail').mockResolvedValue(existingUser);

      const result = await service.addUser(userRegisterDto, professional.id);

      expect(userService.exists).toHaveBeenCalledWith(
        expect.objectContaining({ email: userRegisterDto.email }),
      );
      expect(userService.getByEmail).toHaveBeenCalledWith(
        userRegisterDto.email,
      );
      expect(professional.users.add).toHaveBeenCalledWith(existingUser);
      expect(professionalsRepository.flush).toHaveBeenCalled();
      expect(result).toEqual({
        professional_id: professional.id,
        user_id: existingUser.id,
      });
    });

    it('should register a new user and add to professional', async () => {
      userExistsResponse.exists = false;
      jest.spyOn(userService, 'exists').mockResolvedValue(userExistsResponse);
      jest.spyOn(userService, 'register').mockResolvedValue(newUser);

      const result = await service.addUser(userRegisterDto, professional.id);

      expect(userService.exists).toHaveBeenCalledWith(
        expect.objectContaining({ email: userRegisterDto.email }),
      );
      expect(userRegisterDto.professionals_id).toEqual([professional.id]);
      expect(userService.register).toHaveBeenCalledWith(userRegisterDto);
      expect(result).toEqual({
        professional_id: professional.id,
        user_id: newUser.id,
      });
    });

    it('should throw BadRequestException if professional not found', async () => {
      jest.spyOn(service, 'getById').mockResolvedValue(null);
      await expect(
        service.addUser(userRegisterDto, 'nonExistentProId'),
      ).rejects.toThrow(
        new BadRequestException('error-professional-not_found'),
      );
    });
  });

  describe('update', () => {
    it('should update a professional successfully', async () => {
      const professional = new Professionals();
      professional.id = 'someId';
      professional.email = 'old@example.com';
      professional.name = 'Old Name';
      professional.type = UserRole.PERSONAL_TRAINER;

      const user = new User();
      user.id = 'userId';
      user.email = 'old@example.com';

      const updateData: Partial<Professionals> = {
        email: 'new@example.com',
        name: 'New Name',
        type: UserRole.NUTRITIONIST,
      };

      jest
        .spyOn(professionalsRepository, 'findOne')
        .mockResolvedValue(professional);
      jest.spyOn(userService, 'getByEmail').mockResolvedValue(user);
      jest.spyOn(userService, 'update').mockResolvedValue(user);
      jest.spyOn(professionalsRepository, 'flush').mockResolvedValue(undefined);

      const result = await service.update('someId', updateData);

      expect(result.email).toEqual('new@example.com');
      expect(result.name).toEqual('New Name');
      expect(result.type).toEqual('nutritionist');
      expect(professionalsRepository.flush).toHaveBeenCalled();
    });

    it('should throw BadRequestException if professional not found', async () => {
      jest.spyOn(professionalsRepository, 'findOne').mockResolvedValue(null);
      await expect(service.update('nonExistentId', {})).rejects.toThrow(
        new BadRequestException('error-professional-not_found'),
      );
    });
  });

  describe('updateByEmail', () => {
    it('should update a professional by email successfully', async () => {
      const professional = new Professionals();
      professional.email = 'old@example.com';
      professional.name = 'Old Name';
      const updateData: Partial<Professionals> = { name: 'New Name' };

      jest
        .spyOn(professionalsRepository, 'findOne')
        .mockResolvedValue(professional);
      jest.spyOn(professionalsRepository, 'flush').mockResolvedValue(undefined);

      const result = await service.updateByEmail('old@example.com', updateData);

      expect(result.name).toEqual('New Name');
      expect(professionalsRepository.flush).toHaveBeenCalled();
    });

    it('should throw BadRequestException if professional not found', async () => {
      jest.spyOn(professionalsRepository, 'findOne').mockResolvedValue(null);
      await expect(
        service.updateByEmail('nonExistent@example.com', {}),
      ).rejects.toThrow(
        new BadRequestException('error-professional-not_found'),
      );
    });
  });

  describe('delete', () => {
    it('should delete a professional successfully', async () => {
      const professional = new Professionals();
      professional.id = 'someId';
      professional.email = 'pro@example.com';

      const user = new User();
      user.id = 'userId';

      jest
        .spyOn(professionalsRepository, 'findOne')
        .mockResolvedValue(professional);
      jest.spyOn(userService, 'getByEmail').mockResolvedValue(user);
      jest.spyOn(professionalsRepository, 'remove').mockReturnValue(undefined);
      jest.spyOn(userService, 'delete').mockResolvedValue(true);
      jest.spyOn(professionalsRepository, 'flush').mockResolvedValue(undefined);

      const result = await service.delete('someId');

      expect(!result).toBe(true);
      expect(professionalsRepository.remove).toHaveBeenCalledWith(professional);
      expect(userService.delete).toHaveBeenCalledWith(user.id);
      expect(professionalsRepository.flush).toHaveBeenCalled();
    });

    it('should throw BadRequestException if professional not found', async () => {
      jest.spyOn(professionalsRepository, 'findOne').mockResolvedValue(null);
      await expect(service.delete('nonExistentId')).rejects.toThrow(
        new BadRequestException('error-professional-not_found'),
      );
    });
  });
});
