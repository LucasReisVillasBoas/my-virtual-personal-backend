import { Test, TestingModule } from '@nestjs/testing';
import { TrainingService } from '../../src/training/training.service';
import { TrainingRepository } from '../../src/training/training.repository';
import { TrainingTypeRepository } from '../../src/training/training-type.repository';
import { UserService } from '../../src/user/user.service';
import { GoalsService } from '../../src/goals/goals.service';
import { TrainingExerciseService } from '../../src/training-exercise/training-exercise.service';
import { TrainingRegisterRequestDto } from '../../src/training/dto/training-register-request.dto';
import { Training } from '../../src/entities/training/training.entity';
import { User } from '../../src/entities/user/user.entity';
import { Goals } from '../../src/entities/goals/goals.entity';
import { TrainingType } from '../../src/entities/training/training-type.entity';
import { BadRequestException } from '@nestjs/common';
import { TrainingExercise } from '../../src/entities/training-exercise/training-exercise.entity';

describe('TrainingService', () => {
  let service: TrainingService;
  let trainingRepository: TrainingRepository;
  let trainingTypeRepository: TrainingTypeRepository;
  let userService: UserService;
  let goalsService: GoalsService;
  let trainingExerciseService: TrainingExerciseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrainingService,
        {
          provide: TrainingRepository,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            flush: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: TrainingTypeRepository,
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            getById: jest.fn(),
          },
        },
        {
          provide: GoalsService,
          useValue: {
            getById: jest.fn(),
          },
        },
        {
          provide: TrainingExerciseService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TrainingService>(TrainingService);
    trainingRepository = module.get<TrainingRepository>(TrainingRepository);
    trainingTypeRepository = module.get<TrainingTypeRepository>(TrainingTypeRepository);
    userService = module.get<UserService>(UserService);
    goalsService = module.get<GoalsService>(GoalsService);
    trainingExerciseService = module.get<TrainingExerciseService>(TrainingExerciseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    let registerDto: TrainingRegisterRequestDto;
    let user: User;
    let goals: Goals;
    let trainingType: TrainingType;

    beforeEach(() => {
      registerDto = {
        active: true,
        trainingType: 'STRENGTH',
        goalsId: 'goalId1',
        userId: 'userId1',
        trainingExerciseList: [],
      };
      user = new User();
      user.id = 'userId1';
      goals = new Goals();
      goals.id = 'goalId1';
      trainingType = new TrainingType();
      trainingType.code = 'STRENGTH';

      jest.spyOn(userService, 'getById').mockResolvedValue(user);
      jest.spyOn(goalsService, 'getById').mockResolvedValue(goals);
      jest.spyOn(trainingTypeRepository, 'findOne').mockResolvedValue(trainingType);
      jest.spyOn(trainingRepository, 'create').mockImplementation((data) => {
        const training = new Training();
        Object.assign(training, data);
        return training;
      });
      jest.spyOn(trainingRepository, 'flush').mockResolvedValue(undefined);
    });

    it('should register a new training successfully without exercises', async () => {
      const result = await service.register(registerDto);

      expect(result).toBeInstanceOf(Training);
      expect(result.active).toEqual(true);
      expect(result.trainingType).toEqual(trainingType);
      expect(result.goals).toEqual(goals);
      expect(result.user).toEqual(user);
      expect(userService.getById).toHaveBeenCalledWith('userId1');
      expect(goalsService.getById).toHaveBeenCalledWith('goalId1');
      expect(trainingTypeRepository.findOne).toHaveBeenCalledWith({ code: 'STRENGTH' });
      expect(trainingRepository.create).toHaveBeenCalledWith(expect.objectContaining({
        active: true,
        trainingType,
        goals,
        user,
      }));
      expect(trainingRepository.flush).toHaveBeenCalled();
      expect(trainingExerciseService.create).not.toHaveBeenCalled();
    });

    it('should register a new training successfully with exercises', async () => {
      const exercise1 = new TrainingExercise();
      exercise1.sets = 3;
      exercise1.reps = "10";
      exercise1.rest_time = "60";
      exercise1.exercise = { code: 'EX001' } as any;

      registerDto.trainingExerciseList = [exercise1];

      const result = await service.register(registerDto);

      expect(result).toBeInstanceOf(Training);
      expect(trainingExerciseService.create).toHaveBeenCalledWith(expect.objectContaining({
        sets: exercise1.sets,
        reps: exercise1.reps,
        restTime: exercise1.rest_time,
        trainingId: result.id,
        exerciseCode: exercise1.exercise.code,
      }));
      expect(trainingRepository.flush).toHaveBeenCalled();
    });

    it('should throw BadRequestException if user not found', async () => {
      jest.spyOn(userService, 'getById').mockResolvedValue(null);
      await expect(service.register(registerDto)).rejects.toThrow(
        new BadRequestException('error-user-not_found'),
      );
    });

    it('should throw BadRequestException if goals not found', async () => {
      jest.spyOn(goalsService, 'getById').mockResolvedValue(null);
      await expect(service.register(registerDto)).rejects.toThrow(
        new BadRequestException('error-goals-not_found'),
      );
    });

    it('should throw BadRequestException if training type not found', async () => {
      jest.spyOn(trainingTypeRepository, 'findOne').mockResolvedValue(null);
      await expect(service.register(registerDto)).rejects.toThrow(
        new BadRequestException('error-training_type-not_found'),
      );
    });
  });

  describe('getAllByType', () => {
    it('should return an array of training types', async () => {
      const trainingTypes = [new TrainingType(), new TrainingType()];
      jest.spyOn(trainingTypeRepository, 'find').mockResolvedValue(trainingTypes);
      expect(await service.getAllByType('typeId')).toEqual(trainingTypes);
    });
  });

  describe('getAll', () => {
    it('should return an array of trainings', async () => {
      const trainings = [new Training(), new Training()];
      jest.spyOn(trainingRepository, 'findAll').mockResolvedValue(trainings);
      expect(await service.getAll()).toEqual(trainings);
    });
  });

  describe('getById', () => {
    it('should return a training by id', async () => {
      const training = new Training();
      jest.spyOn(trainingRepository, 'findOne').mockResolvedValue(training);
      expect(await service.getById('someId')).toEqual(training);
    });

    it('should throw BadRequestException if training not found', async () => {
      jest.spyOn(trainingRepository, 'findOne').mockResolvedValue(null);
      await expect(service.getById('nonExistentId')).rejects.toThrow(
        new BadRequestException('error-training-not_found'),
      );
    });
  });

  describe('update', () => {
    let training: Training;

    beforeEach(() => {
      training = new Training();
      training.id = 'someId';
      training.active = true;
      training.trainingExerciseList = { add: jest.fn() } as any;
      jest.spyOn(service, 'getById').mockResolvedValue(training);
      jest.spyOn(trainingRepository, 'flush').mockResolvedValue(undefined);
    });

    it('should update a training successfully', async () => {
      const updatedData: Partial<Training> = { active: false };
      const result = await service.update('someId', updatedData);
      expect(result.active).toEqual(false);
      expect(trainingRepository.flush).toHaveBeenCalled();
    });

    it('should update training with new exercises', async () => {
      const exercise1 = new TrainingExercise();
      exercise1.sets = 3;
      exercise1.reps = "10";
      exercise1.rest_time = "60";
      exercise1.exercise = { code: 'EX001' } as any;

      const updateData: Partial<Training> = { trainingExerciseList: [exercise1] };

      const result = await service.update('someId', updateData);

      expect(trainingExerciseService.create).toHaveBeenCalledWith(expect.objectContaining({
        sets: exercise1.sets,
        reps: exercise1.reps,
        restTime: exercise1.rest_time,
        trainingId: training.id,
        exerciseCode: exercise1.exercise.code,
      }));
      expect(result).toEqual(training);
      expect(trainingRepository.flush).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException if training not found', async () => {
      jest.spyOn(service, 'getById').mockResolvedValue(null);
      await expect(service.update('nonExistentId', {})).rejects.toThrow(
        new BadRequestException('error-training-not_found'),
      );
    });
  });

  describe('delete', () => {
    it('should delete a training successfully', async () => {
      const training = new Training();
      training.id = 'someId';

      jest.spyOn(service, 'getById').mockResolvedValue(training);
      jest.spyOn(trainingRepository, 'remove').mockReturnValue(undefined);
      jest.spyOn(trainingRepository, 'flush').mockResolvedValue(undefined);

      const result = await service.delete('someId');
      expect(!result).toBe(true);
      expect(trainingRepository.remove).toHaveBeenCalledWith(training);
      expect(trainingRepository.flush).toHaveBeenCalled();
    });

    it('should throw BadRequestException if training not found', async () => {
      jest.spyOn(service, 'getById').mockResolvedValue(null);
      await expect(service.delete('nonExistentId')).rejects.toThrow(
        new BadRequestException('error-training-not_found'),
      );
    });
  });
});
