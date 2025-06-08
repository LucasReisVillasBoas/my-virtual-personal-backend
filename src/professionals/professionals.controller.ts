import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProfessionalsService } from './professionals.service';
import { ProfessionalData } from 'src/professionals/dto/professional-found-response.dto';
import { UserRegisterRequestDto } from 'src/user/dto/user-register-request.dto';
import { UserRegisterResponseDto } from 'src/user/dto/user-register-response.dto';
import { UserResponseDto } from 'src/user/dto/user-response.dto';
import { ProfessionalResponseDto } from 'src/professionals/dto/professional-response.dto';
import { Professionals } from 'src/entities/professionals/professionals.entity';

@Controller('professionals')
@ApiTags('Professionals')
export class ProfessionalsController {
  constructor(private readonly professionalsService: ProfessionalsService) {}
  @ApiResponse({
    status: 200,
    type: UserRegisterRequestDto,
    description: 'User registered into Professional',
  })
  @Post('register/user')
  async register(
    @Body() userRegisterRequestDto: UserRegisterRequestDto,
    @Query('id') id: string,
  ): Promise<UserRegisterResponseDto> {
    await this.professionalsService.addUser(userRegisterRequestDto, id);
    const userRegisterResponseDto = new UserRegisterResponseDto();

    userRegisterResponseDto.message = 'User added to Professional';
    userRegisterResponseDto.statusCode = HttpStatus.CREATED;

    return userRegisterResponseDto;
  }

  @ApiResponse({
    status: 200,
    type: ProfessionalData,
    description: 'Professional found',
  })
  @Get('/')
  async getById(@Query('id') id: string) {
    const professional = await this.professionalsService.getById(id);

    const response = new ProfessionalData();
    response.data = { professional: professional };
    response.statusCode = HttpStatus.OK;
    response.message = 'Professional found';
    return professional;
  }

  @ApiResponse({
    status: 200,
    type: Array<ProfessionalResponseDto>,
    description: 'Users found',
  })
  @Get('/all')
  async getAll() {
    const professionalsList = await this.professionalsService.getAll();

    return new ProfessionalResponseDto('Users found', 200, {
      data: professionalsList,
    });
  }

  @ApiResponse({
    status: 200,
    type: ProfessionalResponseDto,
    description: 'User updated successfully',
  })
  @Put('/')
  async update(
    @Query('id') id: string,
    @Body() professionalRequestDto: Partial<Professionals>,
  ) {
    const professionalUpdated = await this.professionalsService.update(
      id,
      professionalRequestDto,
    );

    return new ProfessionalResponseDto('User updated successfully', 200, {
      data: professionalUpdated,
    });
  }

  @ApiResponse({
    status: 200,
    type: UserResponseDto,
    description: 'User deleted successfully',
  })
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    const userUpdated = await this.professionalsService.delete(id);

    return new UserResponseDto('User deleted successfully', 200, {
      data: { userDeleted: userUpdated },
    });
  }
}
