import { Controller, Get } from '@nestjs/common';
import { GenderService } from './gender.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GenderResponseDto } from './dto/gender-response.dto';

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
  @Get()
  async list(): Promise<GenderResponseDto[]> {
    const genderList = await this.genderService.getAll();
    return genderList;
  }
}
