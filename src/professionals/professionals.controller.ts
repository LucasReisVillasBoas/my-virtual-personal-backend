import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProfessionalsService } from './professionals.service';
import { UserRegisterRequestDto } from 'src/professionals/dto/user-register-request.dto';
import { UserRegisterResponseDto } from 'src/professionals/dto/user-register-response.dto';
import { ProfessionalData } from 'src/professionals/dto/professional-found-response.dto';

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
}
