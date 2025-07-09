import { Test, TestingModule } from '@nestjs/testing';
import { TrainingController } from '../../src/training/training.controller';
import { TrainingService } from '../../src/training/training.service';
import { TrainingRegisterRequestDto } from '../../src/training/dto/training-register-request.dto';
import { Training } from '../../src/entities/training/training.entity';
import { TrainingRegisterResponseDto } from '../../src/training/dto/training-register-response.dto';
import { TrainingResponseDto } from '../../src/training/dto/training-response.dto';
import * as TrainingUtil from '../../src/utils/training.util';
import { TrainingTypeResponseDto } from '../../src/training/dto/training-type-response.dto';

describe('TrainingController', () => {
  let controller: TrainingController;
  let service: TrainingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrainingController],
      providers: [
        {
          provide: TrainingService,
          useValue: {
            register: jest.fn(),
            getAllByType: jest.fn(),
            getAll: jest.fn(),
            getById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TrainingController>(TrainingController);
    service = module.get<TrainingService>(TrainingService);

    jest
      .spyOn(TrainingUtil, 'filterTrainingFields')
      .mockImplementation((training) => {
        const filteredTraining = { ...training } as any;
        if (filteredTraining.user && filteredTraining.user.gender) {
          filteredTraining.user.gender = filteredTraining.user.gender.code;
        }
        if (filteredTraining.trainingType) {
          filteredTraining.trainingType = {
            id: filteredTraining.trainingType.id,
            code: filteredTraining.trainingType.code,
            description: filteredTraining.trainingType.description,
          };
        }
        if (filteredTraining.goals) {
          filteredTraining.goals = {
            id: filteredTraining.goals.id,
            code: filteredTraining.goals.code,
            description: filteredTraining.goals.description,
            active: filteredTraining.goals.active,
          };
        }
        return filteredTraining;
      });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should register a training and return a success response', async () => {
      const registerDto: TrainingRegisterRequestDto = {
        active: true,
        trainingType: 'Strength',
        goalsId: 'goalId1',
        userId: 'userId1',
        trainingExerciseList: [],
      };
      const createdTraining = new Training();
      createdTraining.id = 'someId';
      createdTraining.active = true;
      createdTraining.trainingType = {
        id: 'typeId1',
        code: 'STRENGTH',
        description: 'Strength Training',
      } as any;
      createdTraining.goals = {
        id: 'goalId1',
        code: 'GOAL001',
        description: 'Build Muscle',
        active: true,
      } as any;
      createdTraining.user = {
        id: 'userId1',
        fullName: 'Test User',
        email: 'test@example.com',
      } as any;
      createdTraining.trainingExerciseList = [];

      jest.spyOn(service, 'register').mockResolvedValue(createdTraining);

      const result = await controller.register(registerDto);

      expect(result).toBeInstanceOf(TrainingRegisterResponseDto);
      expect(result.message).toEqual('Training created');
      expect(result.statusCode).toEqual(201);
      expect(result.data['training']).toEqual(createdTraining);
      expect(service.register).toHaveBeenCalledWith(registerDto);
      expect(TrainingUtil.filterTrainingFields).toHaveBeenCalledWith(
        createdTraining,
      );
    });
  });

  describe('listType', () => {
    it('should return a list of trainings by type', async () => {
      const trainings: TrainingTypeResponseDto[] = [];
      jest.spyOn(service, 'getAllByType').mockResolvedValue(trainings);

      const result = await controller.listType('type1');

      expect(result).toBeInstanceOf(TrainingResponseDto);
      expect(result.message).toEqual('Training retrieved by type');
      expect(result.statusCode).toEqual(200);
      expect(result.data['trainingList']).toEqual(trainings);
      expect(service.getAllByType).toHaveBeenCalledWith('type1');
    });
  });

  describe('list', () => {
    it('should return a list of all trainings', async () => {
      const trainings = [new Training(), new Training()];
      jest.spyOn(service, 'getAll').mockResolvedValue(trainings);

      const result = await controller.list();

      expect(result).toBeInstanceOf(TrainingResponseDto);
      expect(result.message).toEqual('Training list retrieved');
      expect(result.statusCode).toEqual(200);
      expect(result.data['trainingList']).toEqual(
        trainings.map((t) => TrainingUtil.filterTrainingFields(t)),
      );
      expect(service.getAll).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return training details by id', async () => {
      const training = new Training();
      training.id = 'someId';
      jest.spyOn(service, 'getById').mockResolvedValue(training);

      const result = await controller.getById('someId');

      expect(result).toBeInstanceOf(TrainingResponseDto);
      expect(result.message).toEqual('Training retrieved by id');
      expect(result.statusCode).toEqual(200);
      expect(result.data['training']).toEqual(
        TrainingUtil.filterTrainingFields(training),
      );
      expect(service.getById).toHaveBeenCalledWith('someId');
    });
  });

  describe('update', () => {
    it('should update a training and return a success response', async () => {
      const updatedTraining = new Training();
      updatedTraining.id = 'someId';
      updatedTraining.active = false;
      const updateData: Partial<Training> = { active: false };

      jest.spyOn(service, 'update').mockResolvedValue(updatedTraining);

      const result = await controller.update('someId', updateData);

      expect(result).toBeInstanceOf(TrainingResponseDto);
      expect(result.message).toEqual('Training updated successfully');
      expect(result.statusCode).toEqual(200);
      expect(result.data['training']).toEqual(updatedTraining);
      expect(service.update).toHaveBeenCalledWith('someId', updateData);
    });
  });

  describe('delete', () => {
    it('should delete a training and return a success response', async () => {
      jest.spyOn(service, 'delete').mockResolvedValue(true);

      const result = await controller.delete('someId');

      expect(result).toBeInstanceOf(TrainingResponseDto);
      expect(result.message).toEqual('Training deleted successfully');
      expect(result.statusCode).toEqual(200);
      expect(result.data['trainingDeleted']).toEqual(true);
      expect(service.delete).toHaveBeenCalledWith('someId');
    });
  });
});
