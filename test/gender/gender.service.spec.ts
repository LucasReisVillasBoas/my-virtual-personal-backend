import { Test, TestingModule } from '@nestjs/testing';
import { GenderService } from '../../src/gender/gender.service';
import { GenderRepository } from '../../src/gender/gender.repository';
import { Gender } from '../../src/entities/gender/gender.entity';
import { BadRequestException } from '@nestjs/common';

describe('GenderService', () => {
  let service: GenderService;
  let genderRepository: GenderRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GenderService,
        {
          provide: GenderRepository,
          useValue: {
            findOne: jest.fn(),
            findAll: jest.fn(),
            flush: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<GenderService>(GenderService);
    genderRepository = module.get<GenderRepository>(GenderRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getById', () => {
    it('should return a gender by id', async () => {
      const gender = new Gender();
      jest.spyOn(genderRepository, 'findOne').mockResolvedValue(gender);
      expect(await service.getById('someId')).toEqual(gender);
    });
  });

  describe('getAll', () => {
    it('should return an array of genders', async () => {
      const genders = [new Gender(), new Gender()];
      jest.spyOn(genderRepository, 'findAll').mockResolvedValue(genders);
      expect(await service.getAll()).toEqual(genders);
    });
  });

  describe('update', () => {
    it('should update a gender successfully', async () => {
      const gender = new Gender();
      gender.id = 'someId';
      gender.code = 'Old Gender';
      const updatedData = { code: 'New Gender' };

      jest.spyOn(genderRepository, 'findOne').mockResolvedValue(gender);
      jest.spyOn(genderRepository, 'flush').mockResolvedValue(undefined);

      const result = await service.update('someId', updatedData);
      expect(result.code).toEqual('New Gender');
      expect(genderRepository.flush).toHaveBeenCalled();
    });

    it('should throw BadRequestException if gender not found', async () => {
      jest.spyOn(genderRepository, 'findOne').mockResolvedValue(null);
      await expect(service.update('nonExistentId', {})).rejects.toThrow(
        new BadRequestException('error-gender-not_found'),
      );
    });
  });

  describe('delete', () => {
    it('should delete a gender successfully', async () => {
      const gender = new Gender();
      gender.id = 'someId';

      jest.spyOn(genderRepository, 'findOne').mockResolvedValue(gender);
      jest.spyOn(genderRepository, 'remove').mockReturnValue(undefined);
      jest.spyOn(genderRepository, 'flush').mockResolvedValue(undefined);

      const result = await service.delete('someId');
      expect(result).toBe(true);
      expect(genderRepository.remove).toHaveBeenCalledWith(gender);
      expect(genderRepository.flush).toHaveBeenCalled();
    });

    it('should throw BadRequestException if gender not found', async () => {
      jest.spyOn(genderRepository, 'findOne').mockResolvedValue(null);
      await expect(service.delete('nonExistentId')).rejects.toThrow(
        new BadRequestException('error-gender-not_found'),
      );
    });
  });
});
