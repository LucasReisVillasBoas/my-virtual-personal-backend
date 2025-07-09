import { Test, TestingModule } from '@nestjs/testing';
import { RestrictionController } from '../../src/restriction/restriction.controller';
import { RestrictionService } from '../../src/restriction/restriction.service';
import { RestrictionRegisterRequestDto } from '../../src/restriction/dto/restriction-register-request.dto';
import { Restriction } from '../../src/entities/restriction/restriction.entity';
import { RestrictionRegisterResponseDto } from '../../src/restriction/dto/restriction-register-response.dto';
import { RestrictionDefaultResponseDto } from '../../src/restriction/dto/restriction-default-response.dto';

describe('RestrictionController', () => {
  let controller: RestrictionController;
  let service: RestrictionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestrictionController],
      providers: [
        {
          provide: RestrictionService,
          useValue: {
            register: jest.fn(),
            getAll: jest.fn(),
            getById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<RestrictionController>(RestrictionController);
    service = module.get<RestrictionService>(RestrictionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should register a restriction and return a success response', async () => {
      const registerDto: RestrictionRegisterRequestDto = {
        code: 'GLUTEN',
        description: 'Gluten intolerance',
      };
      const createdRestriction = new Restriction();
      createdRestriction.id = 'someId';
      createdRestriction.description = 'Gluten intolerance';

      jest.spyOn(service, 'register').mockResolvedValue(createdRestriction);

      const result = await controller.register(registerDto);

      expect(result).toBeInstanceOf(RestrictionRegisterResponseDto);
      expect(result.message).toEqual('Restriction created');
      expect(result.statusCode).toEqual(201);
      expect(result.data['restriction']).toEqual(createdRestriction);
      expect(service.register).toHaveBeenCalledWith(registerDto);
    });
  });

  describe('list', () => {
    it('should return a list of restrictions', async () => {
      const restrictions = [new Restriction(), new Restriction()];
      jest.spyOn(service, 'getAll').mockResolvedValue(restrictions);

      const result = await controller.list();

      expect(result).toBeInstanceOf(RestrictionDefaultResponseDto);
      expect(result.message).toEqual('Restriction list retrieved');
      expect(result.statusCode).toEqual(200);
      expect(result.data['restrictions']).toEqual(restrictions);
      expect(service.getAll).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return restriction details by id', async () => {
      const restriction = new Restriction();
      restriction.id = 'someId';
      jest.spyOn(service, 'getById').mockResolvedValue(restriction);

      const result = await controller.getById('someId');

      expect(result).toBeInstanceOf(RestrictionDefaultResponseDto);
      expect(result.message).toEqual('Restriction retrieved');
      expect(result.statusCode).toEqual(200);
      expect(result.data['restriction']).toEqual(restriction);
      expect(service.getById).toHaveBeenCalledWith('someId');
    });
  });

  describe('update', () => {
    it('should update a restriction and return a success response', async () => {
      const updatedRestriction = new Restriction();
      updatedRestriction.id = 'someId';
      updatedRestriction.description = 'Updated Gluten intolerance';
      const updateData: Partial<Restriction> = { description: 'Updated Gluten intolerance' };

      jest.spyOn(service, 'update').mockResolvedValue(updatedRestriction);

      const result = await controller.update('someId', updateData);

      expect(result).toBeInstanceOf(RestrictionDefaultResponseDto);
      expect(result.message).toEqual('Restriction updated successfully');
      expect(result.statusCode).toEqual(200);
      expect(result.data['restriction']).toEqual(updatedRestriction);
      expect(service.update).toHaveBeenCalledWith('someId', updateData);
    });
  });

  describe('delete', () => {
    it('should delete a restriction and return a success response', async () => {
      jest.spyOn(service, 'delete').mockResolvedValue(true);

      const result = await controller.delete('someId');

      expect(result).toBeInstanceOf(RestrictionDefaultResponseDto);
      expect(result.message).toEqual('Restriction deleted successfully');
      expect(result.statusCode).toEqual(200);
      expect(result.data['restrictionDeleted']).toEqual(true);
      expect(service.delete).toHaveBeenCalledWith('someId');
    });
  });
});
