import { Test, TestingModule } from '@nestjs/testing';
import { GenderController } from '../../src/gender/gender.controller';
import { GenderService } from '../../src/gender/gender.service';
import { Gender } from '../../src/entities/gender/gender.entity';
import { GenderDefaultResponseDto } from '../../src/gender/dto/gender-default-response.dto';

describe('GenderController', () => {
  let controller: GenderController;
  let service: GenderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenderController],
      providers: [
        {
          provide: GenderService,
          useValue: {
            getAll: jest.fn(),
            getById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<GenderController>(GenderController);
    service = module.get<GenderService>(GenderService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('list', () => {
    it('should return a list of genders', async () => {
      const genders = [new Gender(), new Gender()];
      jest.spyOn(service, 'getAll').mockResolvedValue(genders);

      const result = await controller.list();

      expect(result).toBeInstanceOf(GenderDefaultResponseDto);
      expect(result.message).toEqual('Gender list retrieved successfully');
      expect(result.statusCode).toEqual(200);
      expect(result.data['genders']).toEqual(genders);
      expect(service.getAll).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return gender details by id', async () => {
      const gender = new Gender();
      gender.id = 'someId';
      jest.spyOn(service, 'getById').mockResolvedValue(gender);

      const result = await controller.getById('someId');

      expect(result).toBeInstanceOf(GenderDefaultResponseDto);
      expect(result.message).toEqual('Gender details retrieved successfully');
      expect(result.statusCode).toEqual(200);
      expect(result.data['gender']).toEqual(gender);
      expect(service.getById).toHaveBeenCalledWith('someId');
    });
  });

  describe('update', () => {
    it('should update a gender and return a success response', async () => {
      const updatedGender = new Gender();
      updatedGender.id = 'someId';
      updatedGender.code = 'code';
      const updateData: Partial<Gender> = { code: 'Updated Gender' };

      jest.spyOn(service, 'update').mockResolvedValue(updatedGender);

      const result = await controller.update('someId', updateData);

      expect(result).toBeInstanceOf(GenderDefaultResponseDto);
      expect(result.message).toEqual('Gender updated successfully');
      expect(result.statusCode).toEqual(200);
      expect(result.data['gender']).toEqual(updatedGender);
      expect(service.update).toHaveBeenCalledWith('someId', updateData);
    });
  });

  describe('delete', () => {
    it('should delete a gender and return a success response', async () => {
      jest.spyOn(service, 'delete').mockResolvedValue(true);

      const result = await controller.delete('someId');

      expect(result).toBeInstanceOf(GenderDefaultResponseDto);
      expect(result.message).toEqual('Gender deleted successfully');
      expect(result.statusCode).toEqual(200);
      expect(result.data['genderDeleted']).toEqual(true);
      expect(service.delete).toHaveBeenCalledWith('someId');
    });
  });
});
