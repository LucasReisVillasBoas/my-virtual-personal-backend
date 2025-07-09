import { Test, TestingModule } from '@nestjs/testing';
import { TrainingExerciseService } from '../../src/training-exercise/training-exercise.service';
import { TrainingExerciseRepository } from '../../src/training-exercise/training-exercise.repository';
import { TrainingService } from '../../src/training/training.service';
import { ExerciseService } from '../../src/exercise/exercise.service';
import { TrainingExerciseRegisterRequestDto } from '../../src/training-exercise/dto/training-exercise-register-request.dto';
import { TrainingExercise } from '../../src/entities/training-exercise/training-exercise.entity';
import { Training } from '../../src/entities/training/training.entity';
import { Exercise } from '../../src/entities/exercise/exercise.entity';
import { BadRequestException } from '@nestjs/common';
import { getRepositoryToken } from '@mikro-orm/nestjs';

describe('TrainingExerciseService', () => {
  let service: TrainingExerciseService;
  let trainingExerciseRepository: TrainingExerciseRepository;
  let trainingService: TrainingService;
  let exerciseService: ExerciseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrainingExerciseService,
        {
          provide: getRepositoryToken(TrainingExercise),
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            flush: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: TrainingService,
          useValue: {
            getById: jest.fn(),
          },
        },
        {
          provide: ExerciseService,
          useValue: {
            getByCode: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TrainingExerciseService>(TrainingExerciseService);
    trainingExerciseRepository = module.get<TrainingExerciseRepository>(getRepositoryToken(TrainingExercise));
    trainingService = module.get<TrainingService>(TrainingService);
    exerciseService = module.get<ExerciseService>(ExerciseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of training exercises', async () => {
      const trainingExercises = [new TrainingExercise(), new TrainingExercise()];
      jest.spyOn(trainingExerciseRepository, 'findAll').mockResolvedValue(trainingExercises);
      expect(await service.findAll()).toEqual(trainingExercises);
    });
  });

  describe('findById', () => {
    it('should return a training exercise by id', async () => {
      const trainingExercise = new TrainingExercise();
      jest.spyOn(trainingExerciseRepository, 'findOne').mockResolvedValue(trainingExercise);
      expect(await service.findById('someId')).toEqual(trainingExercise);
    });

    it('should throw BadRequestException if training exercise not found', async () => {
      jest.spyOn(trainingExerciseRepository, 'findOne').mockResolvedValue(null);
      await expect(service.findById('nonExistentId')).rejects.toThrow(
        new BadRequestException('Training exercise not found'),
      );
    });
  });

  describe('create', () => {
    let registerDto: TrainingExerciseRegisterRequestDto;
    let training: Training;
    let exercise: Exercise;

    beforeEach(() => {
      registerDto = {
        sets: 3,
        reps: "10",
        restTime: "60",
        trainingId: 'trainingId1',
        exerciseCode: 'EX001',
      };
      training = new Training();
      training.id = 'trainingId1';
      exercise = new Exercise();
      exercise.code = 'EX001';

      jest.spyOn(trainingService, 'getById').mockResolvedValue(training);
      jest.spyOn(exerciseService, 'getByCode').mockResolvedValue(exercise);
      jest.spyOn(trainingExerciseRepository, 'create').mockImplementation((data) => {
        const trainingExercise = new TrainingExercise();
        Object.assign(trainingExercise, data);
        return trainingExercise;
      });
      jest.spyOn(trainingExerciseRepository, 'flush').mockResolvedValue(undefined);
    });

    it('should create a new training exercise successfully', async () => {
      const result = await service.create(registerDto);

      expect(result).toBeInstanceOf(TrainingExercise);
      expect(result.sets).toEqual(3);
      expect(result.reps).toEqual("10");
      expect(result.rest_time).toEqual("60");
      expect(result.training).toEqual(training);
      expect(result.exercise).toEqual(exercise);
      expect(trainingService.getById).toHaveBeenCalledWith('trainingId1');
      expect(exerciseService.getByCode).toHaveBeenCalledWith('EX001');
      expect(trainingExerciseRepository.create).toHaveBeenCalledWith(expect.objectContaining({
        sets: 3,
        reps: "10",
        rest_time: "60",
        training,
        exercise,
      }));
      expect(trainingExerciseRepository.flush).toHaveBeenCalled();
    });

    it('should throw BadRequestException if training not found', async () => {
      jest.spyOn(trainingService, 'getById').mockResolvedValue(null);
      await expect(service.create(registerDto)).rejects.toThrow(
        new BadRequestException('Training not found'),
      );
    });

    it('should throw BadRequestException if exercise not found', async () => {
      jest.spyOn(exerciseService, 'getByCode').mockResolvedValue(null);
      await expect(service.create(registerDto)).rejects.toThrow(
        new BadRequestException('Exercise not found'),
      );
    });
  });

  describe('update', () => {
    let trainingExercise: TrainingExercise;

    beforeEach(() => {
      trainingExercise = new TrainingExercise();
      trainingExercise.id = 'someId';
      trainingExercise.sets = 3;
      jest.spyOn(service, 'findById').mockResolvedValue(trainingExercise);
      jest.spyOn(trainingExerciseRepository, 'flush').mockResolvedValue(undefined);
    });

    it('should update a training exercise successfully', async () => {
      const updatedData: Partial<TrainingExercise> = { sets: 5 };
      const result = await service.update('someId', updatedData);
      expect(result.sets).toEqual(5);
      expect(trainingExerciseRepository.flush).toHaveBeenCalled();
    });

    it('should throw Error if training exercise not found', async () => {
      jest.spyOn(service, 'findById').mockResolvedValue(null);
      await expect(service.update('nonExistentId', {})).rejects.toThrow(
        new Error('Training exercise not found'),
      );
    });
  });

  describe('delete', () => {
    it('should delete a training exercise successfully', async () => {
      const trainingExercise = new TrainingExercise();
      trainingExercise.id = 'someId';

      jest.spyOn(service, 'findById').mockResolvedValue(trainingExercise);
      jest.spyOn(trainingExerciseRepository, 'remove').mockReturnValue(undefined);
      jest.spyOn(trainingExerciseRepository, 'flush').mockResolvedValue(undefined);

      const result = await service.delete('someId');
      expect(!result).toBe(true);
      expect(trainingExerciseRepository.remove).toHaveBeenCalledWith(trainingExercise);
      expect(trainingExerciseRepository.flush).toHaveBeenCalled();
    });

    it('should throw BadRequestException if training exercise not found', async () => {
      jest.spyOn(service, 'findById').mockResolvedValue(null);
      await expect(service.delete('nonExistentId')).rejects.toThrow(
        new BadRequestException('Training exercise not found'),
      );
    });
  });
});
