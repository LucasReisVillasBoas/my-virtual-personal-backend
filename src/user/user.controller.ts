import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserRegisterRequestDto } from './dto/user-register-request.dto';
import { UserRegisterResponseDto } from './dto/user-register-response.dto';
import { filterUserFields } from '../utils/user.util';
import { UserResponseDto } from 'src/user/dto/user-response.dto';
import { User } from 'src/entities/user/user.entity';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({
    status: 201,
    type: UserRegisterRequestDto,
    description: 'User register',
  })
  @Post('register')
  async register(
    @Body() userRegisterRequestDto: UserRegisterRequestDto,
  ): Promise<UserRegisterResponseDto> {
    const user = await this.userService.register(userRegisterRequestDto);

    const userRegisterResponseDto = new UserRegisterResponseDto(
      'User created',
      201,
      { user: filterUserFields(user, []) },
    );

    return userRegisterResponseDto;
  }

  @ApiResponse({
    status: 200,
    type: UserRegisterResponseDto,
    description: 'User found',
  })
  @Get('/')
  async getById(@Query('id') id: string) {
    const user = await this.userService.getById(id);

    return new UserRegisterResponseDto('User found', 200, {
      user: filterUserFields(user, []),
    });
  }

  @ApiResponse({
    status: 200,
    type: Array<UserRegisterResponseDto>,
    description: 'Users found',
  })
  @Get('/')
  async getAll() {
    const userList = await this.userService.getAll();

    return userList.map((user) => {
      return new UserRegisterResponseDto('Users found', 200, {
        user: filterUserFields(user, []),
      });
    });
  }

  @ApiResponse({
    status: 200,
    type: UserResponseDto,
    description: 'User updated successfully',
  })
  @Put('/')
  async update(
    @Query('id') id: string,
    @Body() userRegisterRequestDto: Partial<User>,
  ) {
    const userUpdated = await this.userService.update(
      id,
      userRegisterRequestDto,
    );

    return new UserResponseDto('User updated successfully', 200, {
      data: filterUserFields(userUpdated, []),
    });
  }

  @ApiResponse({
    status: 200,
    type: UserResponseDto,
    description: 'User deleted successfully',
  })
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    const userDeleted = await this.userService.delete(id);

    return new UserResponseDto('User deleted successfully', 200, {
      data: { userDeleted: userDeleted },
    });
  }
}
