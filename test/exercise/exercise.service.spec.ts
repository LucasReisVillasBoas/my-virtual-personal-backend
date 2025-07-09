import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseService } from '../../src/exercise/exercise.service';
import { ExerciseRepository } from '../../src/exercise/exercise.repository';
import { MuscleGroupService } from '../../src/muscle-group/muscle-group.service';
import { ExerciseRegisterRequestDto } from '../../src/exercise/dto/exercise-register-request.dto';
import { Exercise } from '../../src/entities/exercise/exercise.entity';
import { MuscleGroup } from '../../src/entities/muscle-group/muscle-group.entity';
import { BadRequestException } from '@nestjs/common';
import * as ExerciseUtil from '../../src/utils/exercise.util';

describe('ExerciseService', () => {
  let service: ExerciseService;
  let exerciseRepository: ExerciseRepository;
  let muscleGroupService: MuscleGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExerciseService,
        {
          provide: ExerciseRepository,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            flush: jest.fn(),
            remove: jest.fn(),
            getAll: jest.fn(),
          },
        },
        {
          provide: MuscleGroupService,
          useValue: {
            getByCode: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ExerciseService>(ExerciseService);
    exerciseRepository = module.get<ExerciseRepository>(ExerciseRepository);
    muscleGroupService = module.get<MuscleGroupService>(MuscleGroupService);

    jest.spyOn(ExerciseUtil, 'generateCode').mockReturnValue('MG-B-001');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    let registerDto: ExerciseRegisterRequestDto;
    let muscleGroup: MuscleGroup;

    beforeEach(() => {
      registerDto = {
        description: 'Push-up',
        muscleGroupCode: 'CHEST',
        type: 'B',
      };
      muscleGroup = new MuscleGroup();
      muscleGroup.id = 'someMuscleGroupId';
      muscleGroup.code = 'CHEST';
      muscleGroup.description = 'Chest Muscles';

      jest.spyOn(muscleGroupService, 'getByCode').mockResolvedValue(muscleGroup);
      jest.spyOn(exerciseRepository, 'findAll').mockResolvedValue([]);
      jest.spyOn(exerciseRepository, 'create').mockImplementation((data) => {
        const exercise = new Exercise();
        Object.assign(exercise, data);
        return exercise;
      });
    });

    it('should register a new exercise successfully', async () => {
      const result = await service.register(registerDto);

      expect(result).toBeInstanceOf(Exercise);
      expect(result.description).toEqual('Push-up');
      expect(result.code).toEqual('MG-B-001');
      expect(result.muscleGroup).toEqual(muscleGroup);
      expect(muscleGroupService.getByCode).toHaveBeenCalledWith('CHEST');
      expect(exerciseRepository.findAll).toHaveBeenCalled();
      expect(ExerciseUtil.generateCode).toHaveBeenCalledWith(
        muscleGroup.code,
        registerDto.type,
        [],
      );
      expect(exerciseRepository.create).toHaveBeenCalledWith(expect.objectContaining({
        code: 'MG-B-001',
        description: 'Push-up',
        muscleGroup: muscleGroup,
      }));
      expect(exerciseRepository.flush).toHaveBeenCalled();
    });

    it('should throw BadRequestException if muscle group not found', async () => {
      jest.spyOn(muscleGroupService, 'getByCode').mockResolvedValue(null);
      await expect(service.register(registerDto)).rejects.toThrow(
        new BadRequestException('error-muscle-group-not_found'),
      );
    });
  });

  describe('getAll', () => {
    it('should return an array of exercises', async () => {
      const exercises = [new Exercise(), new Exercise()];
      jest.spyOn(exerciseRepository, 'getAll').mockResolvedValue(exercises);
      expect(await service.getAll()).toEqual(exercises);
    });
  });

  describe('getById', () => {
    it('should return an exercise by id', async () => {
      const exercise = new Exercise();
      jest.spyOn(exerciseRepository, 'findOne').mockResolvedValue(exercise);
      expect(await service.getById('someId')).toEqual(exercise);
    });
  });

  describe('getByCode', () => {
    it('should return an exercise by code', async () => {
      const exercise = new Exercise();
      jest.spyOn(exerciseRepository, 'findOne').mockResolvedValue(exercise);
      expect(await service.getByCode('PU001')).toEqual(exercise);
    });
  });

  describe('update', () => {
    it('should update an exercise successfully', async () => {
      const exercise = new Exercise();
      exercise.id = 'someId';
      exercise.description = 'Old Description';
      const updatedData = { description: 'New Description' };

      jest.spyOn(exerciseRepository, 'findOne').mockResolvedValue(exercise);
      jest.spyOn(exerciseRepository, 'flush').mockResolvedValue(undefined);

      const result = await service.update('someId', updatedData);
      expect(result.description).toEqual('New Description');
      expect(exerciseRepository.flush).toHaveBeenCalled();
    });

    it('should throw BadRequestException if exercise not found', async () => {
      jest.spyOn(exerciseRepository, 'findOne').mockResolvedValue(null);
      await expect(service.update('nonExistentId', {})).rejects.toThrow(
        new BadRequestException('error-exercise-not_found'),
      );
    });
  });

  describe('delete', () => {
    it('should delete an exercise successfully', async () => {
      const exercise = new Exercise();
      exercise.id = 'someId';

      jest.spyOn(exerciseRepository, 'findOne').mockResolvedValue(exercise);
      jest.spyOn(exerciseRepository, 'remove').mockReturnValue(undefined);

      const result = await service.delete('someId');
      expect(!result).toBe(true);
      expect(exerciseRepository.remove).toHaveBeenCalledWith(exercise);
      expect(exerciseRepository.flush).toHaveBeenCalled();
    });

    it('should throw BadRequestException if exercise not found', async () => {
      jest.spyOn(exerciseRepository, 'findOne').mockResolvedValue(null);
      await expect(service.delete('nonExistentId')).rejects.toThrow(
        new BadRequestException('error-exercise-not_found'),
      );
    });
  });
});
