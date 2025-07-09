import { Test, TestingModule } from '@nestjs/testing';
import { GoalsController } from '../../src/goals/goals.controller';
import { GoalsService } from '../../src/goals/goals.service';
import { GoalRegisterRequestDto } from '../../src/goals/dto/goal-register-request.dto';
import { Goals } from '../../src/entities/goals/goals.entity';
import { GoalRegisterResponseDto } from '../../src/goals/dto/goal-register-response.dto';
import { GoalResponseDto } from '../../src/goals/dto/goal-response.dto';

describe('GoalsController', () => {
  let controller: GoalsController;
  let service: GoalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoalsController],
      providers: [
        {
          provide: GoalsService,
          useValue: {
            register: jest.fn(),
            getAll: jest.fn(),
            getById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<GoalsController>(GoalsController);
    service = module.get<GoalsService>(GoalsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should register a goal and return a success response', async () => {
      const registerDto: GoalRegisterRequestDto = {
        code: 'LW001',
        description: 'Lose weight',
        active: true,
      };
      const userId = 'someUserId';
      const createdGoal = new Goals();
      createdGoal.id = 'someGoalId';
      createdGoal.description = 'Lose weight';

      jest.spyOn(service, 'register').mockResolvedValue(createdGoal);

      const result = await controller.register(registerDto, userId);

      expect(result).toBeInstanceOf(GoalRegisterResponseDto);
      expect(result.message).toEqual('Goal created');
      expect(result.statusCode).toEqual(201);
      expect(result.data['goal']).toEqual(createdGoal);
      expect(service.register).toHaveBeenCalledWith(registerDto, userId);
    });
  });

  describe('list', () => {
    it('should return a list of goals', async () => {
      const goals = [new Goals(), new Goals()];
      jest.spyOn(service, 'getAll').mockResolvedValue(goals);

      const result = await controller.list();

      expect(result).toBeInstanceOf(GoalResponseDto);
      expect(result.message).toEqual('Goals list retrieved successfully');
      expect(result.statusCode).toEqual(200);
      expect(result.data['goals']).toEqual(goals);
      expect(service.getAll).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return goal details by id', async () => {
      const goal = new Goals();
      goal.id = 'someGoalId';
      jest.spyOn(service, 'getById').mockResolvedValue(goal);

      const result = await controller.getById('someGoalId');

      expect(result).toBeInstanceOf(GoalResponseDto);
      expect(result.message).toEqual('Goals retrieved');
      expect(result.statusCode).toEqual(200);
      expect(result.data['goal']).toEqual(goal);
      expect(service.getById).toHaveBeenCalledWith('someGoalId');
    });
  });

  describe('update', () => {
    it('should update a goal and return a success response', async () => {
      const updatedGoal = new Goals();
      updatedGoal.id = 'someGoalId';
      updatedGoal.description = 'Updated Goal';
      const updateData: Partial<Goals> = { description: 'Updated Goal' };

      jest.spyOn(service, 'update').mockResolvedValue(updatedGoal);

      const result = await controller.update('someGoalId', updateData);

      expect(result).toBeInstanceOf(GoalResponseDto);
      expect(result.message).toEqual('Goals updated successfully');
      expect(result.statusCode).toEqual(200);
      expect(result.data['goal']).toEqual(updatedGoal);
      expect(service.update).toHaveBeenCalledWith('someGoalId', updateData);
    });
  });

  describe('delete', () => {
    it('should delete a goal and return a success response', async () => {
      jest.spyOn(service, 'delete').mockResolvedValue(true);

      const result = await controller.delete('someGoalId');

      expect(result).toBeInstanceOf(GoalResponseDto);
      expect(result.message).toEqual('Goals deleted successfully');
      expect(result.statusCode).toEqual(200);
      expect(result.data['goalDeleted']).toEqual(true);
      expect(service.delete).toHaveBeenCalledWith('someGoalId');
    });
  });
});
