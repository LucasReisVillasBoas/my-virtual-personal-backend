import { Test, TestingModule } from '@nestjs/testing';
import { MuscleGroupService } from '../../src/muscle-group/muscle-group.service';
import { MuscleGroupRepository } from '../../src/muscle-group/muscle-group.repository';
import { MuscleGroup } from '../../src/entities/muscle-group/muscle-group.entity';
import { BadRequestException } from '@nestjs/common';

describe('MuscleGroupService', () => {
  let service: MuscleGroupService;
  let muscleGroupRepository: MuscleGroupRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MuscleGroupService,
        {
          provide: MuscleGroupRepository,
          useValue: {
            findOne: jest.fn(),
            findAll: jest.fn(),
            flush: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MuscleGroupService>(MuscleGroupService);
    muscleGroupRepository = module.get<MuscleGroupRepository>(MuscleGroupRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of muscle groups', async () => {
      const muscleGroups = [new MuscleGroup(), new MuscleGroup()];
      jest.spyOn(muscleGroupRepository, 'findAll').mockResolvedValue(muscleGroups);
      expect(await service.getAll()).toEqual(muscleGroups);
    });
  });

  describe('getById', () => {
    it('should return a muscle group by id', async () => {
      const muscleGroup = new MuscleGroup();
      jest.spyOn(muscleGroupRepository, 'findOne').mockResolvedValue(muscleGroup);
      expect(await service.getById('someId')).toEqual(muscleGroup);
    });
  });

  describe('getByCode', () => {
    it('should return a muscle group by code', async () => {
      const muscleGroup = new MuscleGroup();
      jest.spyOn(muscleGroupRepository, 'findOne').mockResolvedValue(muscleGroup);
      expect(await service.getByCode('CHEST')).toEqual(muscleGroup);
    });
  });

  describe('update', () => {
    it('should update a muscle group successfully', async () => {
      const muscleGroup = new MuscleGroup();
      muscleGroup.id = 'someId';
      muscleGroup.description = 'Old Description';
      const updatedData = { description: 'New Description' };

      jest.spyOn(muscleGroupRepository, 'findOne').mockResolvedValue(muscleGroup);
      jest.spyOn(muscleGroupRepository, 'flush').mockResolvedValue(undefined);

      const result = await service.update('someId', updatedData);
      expect(result.description).toEqual('New Description');
      expect(muscleGroupRepository.flush).toHaveBeenCalled();
    });

    it('should throw BadRequestException if muscle group not found', async () => {
      jest.spyOn(muscleGroupRepository, 'findOne').mockResolvedValue(null);
      await expect(service.update('nonExistentId', {})).rejects.toThrow(
        new BadRequestException('error-muscle-group-not_found'),
      );
    });
  });

  describe('delete', () => {
    it('should delete a muscle group successfully', async () => {
      const muscleGroup = new MuscleGroup();
      muscleGroup.id = 'someId';

      jest.spyOn(muscleGroupRepository, 'findOne').mockResolvedValue(muscleGroup);
      jest.spyOn(muscleGroupRepository, 'remove').mockReturnValue(undefined);
      jest.spyOn(muscleGroupRepository, 'flush').mockResolvedValue(undefined);

      const result = await service.delete('someId');
      expect(!result).toBe(true);
      expect(muscleGroupRepository.remove).toHaveBeenCalledWith(muscleGroup);
      expect(muscleGroupRepository.flush).toHaveBeenCalled();
    });

    it('should throw BadRequestException if muscle group not found', async () => {
      jest.spyOn(muscleGroupRepository, 'findOne').mockResolvedValue(null);
      await expect(service.delete('nonExistentId')).rejects.toThrow(
        new BadRequestException('error-muscle-group-not_found'),
      );
    });
  });
});
