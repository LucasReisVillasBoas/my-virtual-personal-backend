import { Test, TestingModule } from '@nestjs/testing';
import { RestrictionService } from '../../src/restriction/restriction.service';
import { RestrictionRepository } from '../../src/restriction/restriction.repository';
import { RestrictionRegisterRequestDto } from '../../src/restriction/dto/restriction-register-request.dto';
import { Restriction } from '../../src/entities/restriction/restriction.entity';
import { BadRequestException } from '@nestjs/common';
import * as RestrictionUtil from '../../src/utils/restriction.util';

describe('RestrictionService', () => {
  let service: RestrictionService;
  let restrictionRepository: RestrictionRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestrictionService,
        {
          provide: RestrictionRepository,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            flush: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RestrictionService>(RestrictionService);
    restrictionRepository = module.get<RestrictionRepository>(RestrictionRepository);

    jest.spyOn(RestrictionUtil, 'generateRestrictionCode').mockReturnValue('REST-001');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    let registerDto: RestrictionRegisterRequestDto;

    beforeEach(() => {
      registerDto = {
        code: 'LACTOSE',
        description: 'Lactose intolerance',
      };
      jest.spyOn(restrictionRepository, 'findAll').mockResolvedValue([]);
      jest.spyOn(restrictionRepository, 'create').mockImplementation((data) => {
        const restriction = new Restriction();
        Object.assign(restriction, data);
        return restriction;
      });
    });

    it('should register a new restriction successfully', async () => {
      const result = await service.register(registerDto);

      expect(result).toBeInstanceOf(Restriction);
      expect(result.code).toEqual('REST-001');
      expect(result.description).toEqual('Lactose intolerance');
      expect(restrictionRepository.findAll).toHaveBeenCalled();
      expect(RestrictionUtil.generateRestrictionCode).toHaveBeenCalledWith(
        registerDto.code,
        [],
      );
      expect(restrictionRepository.create).toHaveBeenCalledWith(expect.objectContaining({
        code: 'REST-001',
        description: 'Lactose intolerance',
      }));
      expect(restrictionRepository.flush).toHaveBeenCalled();
    });
  });

  describe('getAll', () => {
    it('should return an array of restrictions', async () => {
      const restrictions = [new Restriction(), new Restriction()];
      jest.spyOn(restrictionRepository, 'findAll').mockResolvedValue(restrictions);
      expect(await service.getAll()).toEqual(restrictions);
    });
  });

  describe('getById', () => {
    it('should return a restriction by id', async () => {
      const restriction = new Restriction();
      jest.spyOn(restrictionRepository, 'findOne').mockResolvedValue(restriction);
      expect(await service.getById('someId')).toEqual(restriction);
    });
  });

  describe('update', () => {
    it('should update a restriction successfully', async () => {
      const restriction = new Restriction();
      restriction.id = 'someId';
      restriction.description = 'Old Description';
      const updatedData = { description: 'New Description' };

      jest.spyOn(service, 'getById').mockResolvedValue(restriction);
      jest.spyOn(restrictionRepository, 'flush').mockResolvedValue(undefined);

      const result = await service.update('someId', updatedData);
      expect(result.description).toEqual('New Description');
      expect(restrictionRepository.flush).toHaveBeenCalled();
    });

    it('should throw BadRequestException if restriction not found', async () => {
      jest.spyOn(service, 'getById').mockResolvedValue(null);
      await expect(service.update('nonExistentId', {})).rejects.toThrow(
        new BadRequestException('error-restriction-not_found'),
      );
    });
  });

  describe('delete', () => {
    it('should delete a restriction successfully', async () => {
      const restriction = new Restriction();
      restriction.id = 'someId';

      jest.spyOn(service, 'getById').mockResolvedValue(restriction);
      jest.spyOn(restrictionRepository, 'remove').mockReturnValue(undefined);
      jest.spyOn(restrictionRepository, 'flush').mockResolvedValue(undefined);

      const result = await service.delete('someId');
      expect(!result).toBe(true);
      expect(restrictionRepository.remove).toHaveBeenCalledWith(restriction);
      expect(restrictionRepository.flush).toHaveBeenCalled();
    });

    it('should throw BadRequestException if restriction not found', async () => {
      jest.spyOn(service, 'getById').mockResolvedValue(null);
      await expect(service.delete('nonExistentId')).rejects.toThrow(
        new BadRequestException('error-restriction-not_found'),
      );
    });
  });
});
