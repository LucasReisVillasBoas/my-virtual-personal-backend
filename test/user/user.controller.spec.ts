import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../src/user/user.controller';
import { UserService } from '../../src/user/user.service';
import { UserRegisterRequestDto } from '../../src/user/dto/user-register-request.dto';
import { UserRegisterResponseDto } from '../../src/user/dto/user-register-response.dto';
import { UserResponseDto } from '../../src/user/dto/user-response.dto';
import { User } from '../../src/entities/user/user.entity';
import { UserRole } from '../../src/entities/user/user-role';
import { Gender } from '../../src/entities/gender/gender.entity';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            register: jest.fn(),
            getById: jest.fn(),
            getAll: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  
    describe('register', () => {
      it('should register a new user and return a success response', async () => {
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

        const gender = new Gender();
        gender.id = 'genderId';

        const user = new User();
        user.email = userRegisterDto.email;
        user.fullName = userRegisterDto.fullName;
        user.nickname = userRegisterDto.nickname;
        user.age = userRegisterDto.age;
        user.height = userRegisterDto.height;
        user.weight = userRegisterDto.weight;
        user.gender = gender;
        user.role = userRegisterDto.role as UserRole;

        jest.spyOn(service, 'register').mockResolvedValue(user);
  
        const result = await controller.register(userRegisterDto);
  
        expect(result).toBeInstanceOf(UserRegisterResponseDto);
        expect(result.message).toEqual('User created');
        expect(result.statusCode).toEqual(201);
        expect(service.register).toHaveBeenCalledWith(userRegisterDto);
      });
    });
  
    describe('getById', () => {
      it('should return user details by id', async () => {
        const user = new User();
        user.id = 'someUserId';
        jest.spyOn(service, 'getById').mockResolvedValue(user);
  
        const result = await controller.getById('someUserId');
  
        expect(result).toBeInstanceOf(UserRegisterResponseDto);
        expect(result.message).toEqual('User found');
        expect(result.statusCode).toEqual(200);
        expect(service.getById).toHaveBeenCalledWith('someUserId');
      });
    });
  
    describe('getAll', () => {
      it('should return a list of users', async () => {
        const users = [new User(), new User()];
        jest.spyOn(service, 'getAll').mockResolvedValue(users);
   
        const result = await controller.getAll();
  
        expect(result).toBeInstanceOf(UserRegisterResponseDto);
        expect(result.message).toEqual('Users found');
        expect(result.statusCode).toEqual(200);
        expect(service.getAll).toHaveBeenCalled();
      });
    });
  
    describe('update', () => {
      it('should update a user and return a success response', async () => {
        const updatedUser = new User();
        updatedUser.id = 'someUserId';
        updatedUser.email = 'Updated email';
        const updateData: Partial<User> = {
          email: 'userupdate@gmail.com',
        };
  
        jest.spyOn(service, 'update').mockResolvedValue(updatedUser);
  
        const result = await controller.update('someUserId', updateData);
  
        expect(result).toBeInstanceOf(UserResponseDto);
        expect(result.message).toEqual('User updated successfully');
        expect(result.statusCode).toEqual(200);
        expect(service.update).toHaveBeenCalledWith(
          'someUserId',
          updateData,
        );
      });
    });
  
    describe('delete', () => {
      it('should delete a professional and return a success response', async () => {
        jest.spyOn(service, 'delete').mockResolvedValue(true);
  
        const result = await controller.delete('someUserId');
  
        expect(result).toBeInstanceOf(UserResponseDto);
        expect(result.message).toEqual('User deleted successfully');
        expect(result.statusCode).toEqual(200);
        expect(service.delete).toHaveBeenCalledWith('someUserId');
      });
    });
});
