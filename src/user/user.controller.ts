import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserRegisterRequestDto } from './dto/user-register-request.dto';
import { UserRegisterResponseDto } from './dto/user-register-response.dto';
import { filterUserFields } from '../utils/user.util';

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
}
