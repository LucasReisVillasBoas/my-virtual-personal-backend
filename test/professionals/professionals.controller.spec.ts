import { Test, TestingModule } from '@nestjs/testing';
import { ProfessionalsController } from '../../src/professionals/professionals.controller';
import { ProfessionalsService } from '../../src/professionals/professionals.service';
import { UserRegisterRequestDto } from '../../src/user/dto/user-register-request.dto';
import { Professionals } from '../../src/entities/professionals/professionals.entity';
import { ProfessionalResponseDto } from '../../src/professionals/dto/professional-response.dto';
import { User } from '../../src/entities/user/user.entity';

describe('ProfessionalsController', () => {
  let controller: ProfessionalsController;
  let service: ProfessionalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfessionalsController],
      providers: [
        {
          provide: ProfessionalsService,
          useValue: {
            getAll: jest.fn(),
            getById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            addUser: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProfessionalsController>(ProfessionalsController);
    service = module.get<ProfessionalsService>(ProfessionalsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should add a user to professional and return a success response', async () => {
      const userRegisterDto: UserRegisterRequestDto = {
        email: 'test@example.com',
        password: 'password123',
        fullName: 'Test User',
        nickname: 'Tester',
        age: '30',
        height: '175',
        weight: '70.0',
        genderId: 'genderId',
        role: 'personal_trainer',
        professionals_id: [],
        clients_id: [],
      };
      const professionalId = 'someProfessionalId';
      const professional = new Professionals();
      professional.id = professionalId;
      const user = new User();
      user.email = 'test@example.com';
      (professional as any).users = { add: jest.fn() };

      jest.spyOn(service, 'addUser').mockResolvedValue({
        professional_id: professionalId,
        user_id: 'someUserId',
      });

      const result = await controller.register(userRegisterDto, professionalId);

      expect(result).toBeInstanceOf(ProfessionalResponseDto);
      expect(result.message).toEqual('User added to Professional');
      expect(result.statusCode).toEqual(201);
      expect(service.addUser).toHaveBeenCalledWith(
        userRegisterDto,
        professionalId,
      );
    });
  });

  describe('getById', () => {
    it('should return professional details by id', async () => {
      const professional = new Professionals();
      professional.id = 'someProfessionalId';
      jest.spyOn(service, 'getById').mockResolvedValue(professional);

      const result = await controller.getById('someProfessionalId');

      expect(result).toBeInstanceOf(ProfessionalResponseDto);
      expect(result.message).toEqual('Professional found');
      expect(result.statusCode).toEqual(200);
      expect(result.data['professional']).toEqual(professional);
      expect(service.getById).toHaveBeenCalledWith('someProfessionalId');
    });
  });

  describe('getAll', () => {
    it('should return a list of professionals', async () => {
      const professionals = [new Professionals(), new Professionals()];
      jest.spyOn(service, 'getAll').mockResolvedValue(professionals);

      const result = await controller.getAll();

      expect(result).toBeInstanceOf(ProfessionalResponseDto);
      expect(result.message).toEqual('Professionals found');
      expect(result.statusCode).toEqual(200);
      expect(result.data['professionals']).toEqual(professionals);
      expect(service.getAll).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update a professional and return a success response', async () => {
      const updatedProfessional = new Professionals();
      updatedProfessional.id = 'someProfessionalId';
      updatedProfessional.email = 'Updated email';
      const updateData: Partial<Professionals> = {
        email: 'Updated Professional',
      };

      jest.spyOn(service, 'update').mockResolvedValue(updatedProfessional);

      const result = await controller.update('someProfessionalId', updateData);

      expect(result).toBeInstanceOf(ProfessionalResponseDto);
      expect(result.message).toEqual('Professional updated successfully');
      expect(result.statusCode).toEqual(200);
      expect(result.data['professional']).toEqual(updatedProfessional);
      expect(service.update).toHaveBeenCalledWith(
        'someProfessionalId',
        updateData,
      );
    });
  });

  describe('delete', () => {
    it('should delete a professional and return a success response', async () => {
      jest.spyOn(service, 'delete').mockResolvedValue(true);

      const result = await controller.delete('someProfessionalId');

      expect(result).toBeInstanceOf(ProfessionalResponseDto);
      expect(result.message).toEqual('Professional deleted successfully');
      expect(result.statusCode).toEqual(200);
      expect(result.data['professionalDeleted']).toEqual(true);
      expect(service.delete).toHaveBeenCalledWith('someProfessionalId');
    });
  });
});
