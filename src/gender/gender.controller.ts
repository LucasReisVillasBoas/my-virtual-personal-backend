import { Body, Controller, Delete, Get, Param, Put, Query } from '@nestjs/common';
import { GenderService } from './gender.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GenderResponseDto } from './dto/gender-response.dto';
import { GenderDefaultResponseDto } from 'src/gender/dto/gender-default-response.dto';
import { Gender } from 'src/entities/gender/gender.entity';

@Controller('gender')
@ApiTags('Gender')
export class GenderController {
  constructor(private readonly genderService: GenderService) {}

  @ApiResponse({
    status: 200,
    type: GenderResponseDto,
    description: 'Gender list',
    isArray: true,
  })
  @Get('/all')
  async list(): Promise<GenderResponseDto[]> {
    const genderList = await this.genderService.getAll();
    return genderList;
  }

  @ApiResponse({
    status: 200,
    type: GenderResponseDto,
    description: 'Gender details',
  })
  @Get('/')
  async getById(@Query('id') id: string): Promise<GenderResponseDto> {
    const gender = await this.genderService.getById(id);
    return gender;
  }

  @ApiResponse({
    status: 200,
    type: GenderDefaultResponseDto,
    description: 'Gender updated',
  })
  @Put('/')
  async update(
    @Query('id') id: string,
    @Body() genderRequestDto: Partial<Gender>,
  ): Promise<GenderDefaultResponseDto> {
    const gender = await this.genderService.update(id, genderRequestDto);
    return new GenderDefaultResponseDto('Gender updated successfully', 200, {
      data: gender,
    });
  }

  @ApiResponse({
    status: 200,
    type: GenderDefaultResponseDto,
    description: 'Gender deleted',
  })
  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<GenderDefaultResponseDto> {
    const gender = await this.genderService.delete(id);
    return new GenderDefaultResponseDto('Gender deleted successfully', 200, {
      data: gender,
    });
  }
}
