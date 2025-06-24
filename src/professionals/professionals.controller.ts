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
import { ProfessionalsService } from './professionals.service';
import { ProfessionalData } from 'src/professionals/dto/professional-found-response.dto';
import { UserRegisterRequestDto } from 'src/user/dto/user-register-request.dto';
import { UserResponseDto } from 'src/user/dto/user-response.dto';
import { ProfessionalResponseDto } from 'src/professionals/dto/professional-response.dto';
import { Professionals } from 'src/entities/professionals/professionals.entity';

@Controller('professionals')
@ApiTags('Professionals')
export class ProfessionalsController {
  constructor(private readonly professionalsService: ProfessionalsService) {}
  @ApiResponse({
    status: 201,
    type: ProfessionalResponseDto,
    description: 'User registered into Professional',
  })
  @Post('register/user')
  async register(
    @Body() userRegisterRequestDto: UserRegisterRequestDto,
    @Query('id') id: string,
  ): Promise<ProfessionalResponseDto> {
    const response = await this.professionalsService.addUser(
      userRegisterRequestDto,
      id,
    );

    return new ProfessionalResponseDto('User added to Professional', 201, {professional: response});
  }

  @ApiResponse({
    status: 200,
    type: ProfessionalData,
    description: 'Professional found',
  })
  @Get('/')
  async getById(@Query('id') id: string) {
    const professional = await this.professionalsService.getById(id);

    return new ProfessionalResponseDto('Professional found', 200, {professional: professional});
  }

  @ApiResponse({
    status: 200,
    type: Array<ProfessionalResponseDto>,
    description: 'Professionals found',
  })
  @Get('/all')
  async getAll() {
    const professionalsList = await this.professionalsService.getAll();

    return new ProfessionalResponseDto('Professionals found', 200, {professionals: professionalsList});
  }

  @ApiResponse({
    status: 200,
    type: ProfessionalResponseDto,
    description: 'Professional updated successfully',
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

    return new ProfessionalResponseDto(
      'Professional updated successfully',
      200,
      {professional: professionalUpdated}
    );
  }

  @ApiResponse({
    status: 200,
    type: ProfessionalResponseDto,
    description: 'Professional deleted successfully',
  })
  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<ProfessionalResponseDto> {
    const userDeleted = await this.professionalsService.delete(id);

    return new ProfessionalResponseDto('Professional deleted successfully', 200, {professionalDeleted: userDeleted});
  }
}
