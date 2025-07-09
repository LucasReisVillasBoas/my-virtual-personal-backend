import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseController } from '../../src/exercise/exercise.controller';
import { ExerciseService } from '../../src/exercise/exercise.service';
import { ExerciseRegisterRequestDto } from '../../src/exercise/dto/exercise-register-request.dto';
import { Exercise } from '../../src/entities/exercise/exercise.entity';
import { ExerciseRegisterResponse } from '../../src/exercise/dto/exercise-register-response.dto';
import { ExerciseDefaultResponseDto } from '../../src/exercise/dto/exercise-default-response.dto';

describe('ExerciseController', () => {
  let controller: ExerciseController;
  let service: ExerciseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExerciseController],
      providers: [
        {
          provide: ExerciseService,
          useValue: {
            register: jest.fn(),
            getAll: jest.fn(),
            getById: jest.fn(),
            getByCode: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ExerciseController>(ExerciseController);
    service = module.get<ExerciseService>(ExerciseService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should register an exercise and return a success response', async () => {
      const registerDto: ExerciseRegisterRequestDto = {
        description: 'Push-up',
        muscleGroupCode: 'CHEST',
        type: 'B',
      };
      const createdExercise = new Exercise();
      createdExercise.id = 'someId';
      createdExercise.description = 'Push-up';

      jest.spyOn(service, 'register').mockResolvedValue(createdExercise);

      const result = await controller.register(registerDto);

      expect(result).toBeInstanceOf(ExerciseRegisterResponse);
      expect(result.message).toEqual('Exercise created');
      expect(result.statusCode).toEqual(201);
      expect(result.data['exercise']).toEqual(createdExercise);
      expect(service.register).toHaveBeenCalledWith(registerDto);
    });
  });

  describe('list', () => {
    it('should return a list of exercises', async () => {
      const exercises = [new Exercise(), new Exercise()];
      jest.spyOn(service, 'getAll').mockResolvedValue(exercises);

      const result = await controller.list();

      expect(result).toBeInstanceOf(ExerciseDefaultResponseDto);
      expect(result.message).toEqual('Exercise list retrieved successfully');
      expect(result.statusCode).toEqual(200);
      expect(result.data['exercises']).toEqual(exercises);
      expect(service.getAll).toHaveBeenCalled();
    });
  });

  describe('details', () => {
    it('should return exercise details by id', async () => {
      const exercise = new Exercise();
      exercise.id = 'someId';
      jest.spyOn(service, 'getById').mockResolvedValue(exercise);

      const result = await controller.details('someId');

      expect(result).toBeInstanceOf(ExerciseDefaultResponseDto);
      expect(result.message).toEqual('Exercise details retrieved successfully by id');
      expect(result.statusCode).toEqual(200);
      expect(result.data['exercise']).toEqual(exercise);
      expect(service.getById).toHaveBeenCalledWith('someId');
    });
  });

  describe('detailsByCode', () => {
    it('should return exercise details by code', async () => {
      const exercise = new Exercise();
      exercise.code = 'PU001';
      jest.spyOn(service, 'getByCode').mockResolvedValue(exercise);

      const result = await controller.detailsByCode('PU001');

      expect(result).toBeInstanceOf(ExerciseDefaultResponseDto);
      expect(result.message).toEqual('Exercise details retrieved successfully by code');
      expect(result.statusCode).toEqual(200);
      expect(result.data['exercise']).toEqual(exercise);
      expect(service.getByCode).toHaveBeenCalledWith('PU001');
    });
  });

  describe('update', () => {
    it('should update an exercise and return a success response', async () => {
      const updatedExercise = new Exercise();
      updatedExercise.id = 'someId';
      updatedExercise.description = 'Updated Push-up';
      const updateData: Partial<Exercise> = { description: 'Updated Push-up' };

      jest.spyOn(service, 'update').mockResolvedValue(updatedExercise);

      const result = await controller.update('someId', updateData);

      expect(result).toBeInstanceOf(ExerciseDefaultResponseDto);
      expect(result.message).toEqual('Exercise updated successfully');
      expect(result.statusCode).toEqual(200);
      expect(result.data['exercise']).toEqual(updatedExercise);
      expect(service.update).toHaveBeenCalledWith('someId', updateData);
    });
  });

  describe('delete', () => {
    it('should delete an exercise and return a success response', async () => {
      jest.spyOn(service, 'delete').mockResolvedValue(true);

      const result = await controller.delete('someId');

      expect(result).toBeInstanceOf(ExerciseDefaultResponseDto);
      expect(result.message).toEqual('Exercise deleted successfully');
      expect(result.statusCode).toEqual(200);
      expect(result.data['exerciseDeleted']).toEqual(true);
      expect(service.delete).toHaveBeenCalledWith('someId');
    });
  });
});
