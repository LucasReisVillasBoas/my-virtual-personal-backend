import { Test, TestingModule } from '@nestjs/testing';
import { GoalsService } from '../../src/goals/goals.service';
import { GoalsRepository } from '../../src/goals/goals.repository';
import { UserService } from '../../src/user/user.service';
import { GoalRegisterRequestDto } from '../../src/goals/dto/goal-register-request.dto';
import { Goals } from '../../src/entities/goals/goals.entity';
import { User } from '../../src/entities/user/user.entity';
import { BadRequestException } from '@nestjs/common';
import * as GoalsUtil from '../../src/utils/goals.util';

describe('GoalsService', () => {
  let service: GoalsService;
  let goalsRepository: GoalsRepository;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GoalsService,
        {
          provide: GoalsRepository,
          useValue: {
            findOne: jest.fn(),
            findAll: jest.fn(),
            create: jest.fn(),
            flush: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            getById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<GoalsService>(GoalsService);
    goalsRepository = module.get<GoalsRepository>(GoalsRepository);
    userService = module.get<UserService>(UserService);

    jest.spyOn(GoalsUtil, 'generateGoalsCode').mockReturnValue('GOAL-001');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    let registerDto: GoalRegisterRequestDto;
    let user: User;

    beforeEach(() => {
      registerDto = {
        code: 'LW001',
        description: 'Lose weight',
        active: true,
      };
      user = new User();
      user.id = 'someUserId';
      user.email = 'test@example.com';

      jest.spyOn(userService, 'getById').mockResolvedValue(user);
      jest.spyOn(goalsRepository, 'findAll').mockResolvedValue([]);
      jest.spyOn(goalsRepository, 'create').mockImplementation((data) => {
        const goal = new Goals();
        Object.assign(goal, data);
        return goal;
      });
    });

    it('should register a new goal successfully', async () => {
      const result = await service.register(registerDto, user.id);

      expect(result).toBeInstanceOf(Goals);
      expect(result.code).toEqual('GOAL-001');
      expect(result.description).toEqual('Lose weight');
      expect(result.active).toEqual(true);
      expect(userService.getById).toHaveBeenCalledWith(user.id);
      expect(goalsRepository.findAll).toHaveBeenCalled();
      expect(GoalsUtil.generateGoalsCode).toHaveBeenCalledWith(
        registerDto.code,
        [],
      );
      expect(goalsRepository.create).toHaveBeenCalledWith(expect.objectContaining({
        code: 'GOAL-001',
        description: 'Lose weight',
        active: true,
        user: user,
      }));
      expect(goalsRepository.flush).toHaveBeenCalled();
    });

    it('should throw BadRequestException if user not found', async () => {
      jest.spyOn(userService, 'getById').mockResolvedValue(null);
      await expect(service.register(registerDto, 'nonExistentUserId')).rejects.toThrow(
        new BadRequestException('error-user-not_found'),
      );
    });
  });

  describe('getById', () => {
    it('should return a goal by id', async () => {
      const goal = new Goals();
      jest.spyOn(goalsRepository, 'findOne').mockResolvedValue(goal);
      expect(await service.getById('someId')).toEqual(goal);
    });
  });

  describe('getAll', () => {
    it('should return an array of goals', async () => {
      const goals = [new Goals(), new Goals()];
      jest.spyOn(goalsRepository, 'findAll').mockResolvedValue(goals);
      expect(await service.getAll()).toEqual(goals);
    });
  });

  describe('update', () => {
    it('should update a goal successfully', async () => {
      const goal = new Goals();
      goal.id = 'someId';
      goal.description = 'Old Description';
      const updatedData = { description: 'New Description' };

      jest.spyOn(goalsRepository, 'findOne').mockResolvedValue(goal);
      jest.spyOn(goalsRepository, 'flush').mockResolvedValue(undefined);

      const result = await service.update('someId', updatedData);
      expect(result.description).toEqual('New Description');
      expect(goalsRepository.flush).toHaveBeenCalled();
    });

    it('should throw BadRequestException if goal not found', async () => {
      jest.spyOn(goalsRepository, 'findOne').mockResolvedValue(null);
      await expect(service.update('nonExistentId', {})).rejects.toThrow(
        new BadRequestException('error-goal-not_found'),
      );
    });
  });

  describe('delete', () => {
    it('should delete a goal successfully', async () => {
      const goal = new Goals();
      goal.id = 'someId';

      jest.spyOn(goalsRepository, 'findOne').mockResolvedValue(goal);
      jest.spyOn(goalsRepository, 'remove').mockReturnValue(undefined);
      jest.spyOn(goalsRepository, 'flush').mockResolvedValue(undefined);

      const result = await service.delete('someId');
      expect(!result).toBe(true);
      expect(goalsRepository.remove).toHaveBeenCalledWith(goal);
      expect(goalsRepository.flush).toHaveBeenCalled();
    });

    it('should throw BadRequestException if goal not found', async () => {
      jest.spyOn(goalsRepository, 'findOne').mockResolvedValue(null);
      await expect(service.delete('nonExistentId')).rejects.toThrow(
        new BadRequestException('error-gender-not_found'),
      );
    });
  });
});
