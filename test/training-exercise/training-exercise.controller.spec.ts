import { Test, TestingModule } from '@nestjs/testing';
import { TrainingExerciseController } from '../../src/training-exercise/training-exercise.controller';
import { TrainingExerciseService } from '../../src/training-exercise/training-exercise.service';
import { TrainingExerciseRegisterRequestDto } from '../../src/training-exercise/dto/training-exercise-register-request.dto';
import { TrainingExercise } from '../../src/entities/training-exercise/training-exercise.entity';
import { TrainingExerciseRegisterResponseDto } from '../../src/training-exercise/dto/training-exercise-register-response.dto';
import { TrainingExerciseDefaultResponseDto } from '../../src/training-exercise/dto/training-exercise-default-response.dto';

describe('TrainingExerciseController', () => {
  let controller: TrainingExerciseController;
  let service: TrainingExerciseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrainingExerciseController],
      providers: [
        {
          provide: TrainingExerciseService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TrainingExerciseController>(TrainingExerciseController);
    service = module.get<TrainingExerciseService>(TrainingExerciseService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should register a training exercise and return a success response', async () => {
      const registerDto: TrainingExerciseRegisterRequestDto = {
        sets: 3,
        reps: "10",
        restTime: "60",
        trainingId: 'trainingId1',
        exerciseCode: 'EX001',
      };
      const createdTrainingExercise = new TrainingExercise();
      createdTrainingExercise.id = 'someId';
      createdTrainingExercise.sets = 3;

      jest.spyOn(service, 'create').mockResolvedValue(createdTrainingExercise);

      const result = await controller.register(registerDto);

      expect(result).toBeInstanceOf(TrainingExerciseRegisterResponseDto);
      expect(result.message).toEqual('Training exercise created');
      expect(result.statusCode).toEqual(201);
      expect(result.data['trainingExercise']).toEqual(createdTrainingExercise);
      expect(service.create).toHaveBeenCalledWith(registerDto);
    });
  });

  describe('getAll', () => {
    it('should return a list of training exercises', async () => {
      const trainingExercises = [new TrainingExercise(), new TrainingExercise()];
      jest.spyOn(service, 'findAll').mockResolvedValue(trainingExercises);

      const result = await controller.getAll();

      expect(result).toBeInstanceOf(TrainingExerciseDefaultResponseDto);
      expect(result.message).toEqual('Training exercise found');
      expect(result.statusCode).toEqual(200);
      expect(result.data['trainingExercises']).toEqual(trainingExercises);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return training exercise details by id', async () => {
      const trainingExercise = new TrainingExercise();
      trainingExercise.id = 'someId';
      jest.spyOn(service, 'findById').mockResolvedValue(trainingExercise);

      const result = await controller.getById('someId');

      expect(result).toBeInstanceOf(TrainingExerciseDefaultResponseDto);
      expect(result.message).toEqual('Training exercise found');
      expect(result.statusCode).toEqual(200);
      expect(result.data['trainingExercise']).toEqual(trainingExercise);
      expect(service.findById).toHaveBeenCalledWith('someId');
    });
  });

  describe('update', () => {
    it('should update a training exercise and return a success response', async () => {
      const updatedTrainingExercise = new TrainingExercise();
      updatedTrainingExercise.id = 'someId';
      updatedTrainingExercise.sets = 5;
      const updateData: Partial<TrainingExercise> = { sets: 5 };

      jest.spyOn(service, 'update').mockResolvedValue(updatedTrainingExercise);

      const result = await controller.update('someId', updateData);

      expect(result).toBeInstanceOf(TrainingExerciseDefaultResponseDto);
      expect(result.message).toEqual('Training exercise updated successfully');
      expect(result.statusCode).toEqual(200);
      expect(result.data['trainingExercise']).toEqual(updatedTrainingExercise);
      expect(service.update).toHaveBeenCalledWith('someId', updateData);
    });
  });

  describe('delete', () => {
    it('should delete a training exercise and return a success response', async () => {
      jest.spyOn(service, 'delete').mockResolvedValue(true);

      const result = await controller.delete('someId');

      expect(result).toBeInstanceOf(TrainingExerciseDefaultResponseDto);
      expect(result.message).toEqual('Training exercise deleted successfully');
      expect(result.statusCode).toEqual(200);
      expect(result.data['trainingExerciseDeleted']).toEqual(true);
      expect(service.delete).toHaveBeenCalledWith('someId');
    });
  });
});
