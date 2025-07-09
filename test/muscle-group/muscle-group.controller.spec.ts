import { Test, TestingModule } from '@nestjs/testing';
import { MuscleGroupController } from '../../src/muscle-group/muscle-group.controller';
import { MuscleGroupService } from '../../src/muscle-group/muscle-group.service';
import { MuscleGroup } from '../../src/entities/muscle-group/muscle-group.entity';
import { MuscleGroupDefaultResponseDto } from '../../src/muscle-group/dto/ muscle-group-default-response.dto';

describe('MuscleGroupController', () => {
  let controller: MuscleGroupController;
  let service: MuscleGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MuscleGroupController],
      providers: [
        {
          provide: MuscleGroupService,
          useValue: {
            getAll: jest.fn(),
            getById: jest.fn(),
            getByCode: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MuscleGroupController>(MuscleGroupController);
    service = module.get<MuscleGroupService>(MuscleGroupService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('list', () => {
    it('should return a list of muscle groups', async () => {
      const muscleGroups = [new MuscleGroup(), new MuscleGroup()];
      jest.spyOn(service, 'getAll').mockResolvedValue(muscleGroups);

      const result = await controller.list();

      expect(result).toBeInstanceOf(MuscleGroupDefaultResponseDto);
      expect(result.message).toEqual('Muscle Group list retrieved successfully');
      expect(result.statusCode).toEqual(200);
      expect(result.data['muscleGroups']).toEqual(muscleGroups);
      expect(service.getAll).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return muscle group details by id', async () => {
      const muscleGroup = new MuscleGroup();
      muscleGroup.id = 'someId';
      jest.spyOn(service, 'getById').mockResolvedValue(muscleGroup);

      const result = await controller.getById('someId');

      expect(result).toBeInstanceOf(MuscleGroupDefaultResponseDto);
      expect(result.message).toEqual('Muscle Group details retrieved successfully');
      expect(result.statusCode).toEqual(200);
      expect(result.data['muscleGroup']).toEqual(muscleGroup);
      expect(service.getById).toHaveBeenCalledWith('someId');
    });
  });

  describe('getByCode', () => {
    it('should return muscle group details by code', async () => {
      const muscleGroup = new MuscleGroup();
      muscleGroup.code = 'CHEST';
      jest.spyOn(service, 'getByCode').mockResolvedValue(muscleGroup);

      const result = await controller.getByCode('CHEST');

      expect(result).toBeInstanceOf(MuscleGroupDefaultResponseDto);
      expect(result.message).toEqual('Muscle Group details retrieved successfully');
      expect(result.statusCode).toEqual(200);
      expect(result.data['muscleGroup']).toEqual(muscleGroup);
      expect(service.getByCode).toHaveBeenCalledWith('CHEST');
    });
  });

  describe('update', () => {
    it('should update a muscle group and return a success response', async () => {
      const updatedMuscleGroup = new MuscleGroup();
      updatedMuscleGroup.id = 'someId';
      updatedMuscleGroup.description = 'Updated Chest';
      const updateData: Partial<MuscleGroup> = { description: 'Updated Chest' };

      jest.spyOn(service, 'update').mockResolvedValue(updatedMuscleGroup);

      const result = await controller.update('someId', updateData);

      expect(result).toBeInstanceOf(MuscleGroupDefaultResponseDto);
      expect(result.message).toEqual('Muscle Group updated successfully');
      expect(result.statusCode).toEqual(200);
      expect(result.data['muscleGroup']).toEqual(updatedMuscleGroup);
      expect(service.update).toHaveBeenCalledWith('someId', updateData);
    });
  });

  describe('delete', () => {
    it('should delete a muscle group and return a success response', async () => {
      jest.spyOn(service, 'delete').mockResolvedValue(true);

      const result = await controller.delete('someId');

      expect(result).toBeInstanceOf(MuscleGroupDefaultResponseDto);
      expect(result.message).toEqual('Muscle Group deleted successfully');
      expect(result.statusCode).toEqual(200);
      expect(result.data['muscleGroupDeleted']).toEqual(true);
      expect(service.delete).toHaveBeenCalledWith('someId');
    });
  });
});
