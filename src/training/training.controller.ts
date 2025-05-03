import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TrainingService } from './training.service';
import { TrainingTypeResponseDto } from './dto/training-type-response.dto';

@Controller('training')
@ApiTags('Training')
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @ApiResponse({
    status: 200,
    type: TrainingTypeResponseDto,
    description: 'Training Type list',
    isArray: true,
  })
  @Get('/type')
  async list(): Promise<TrainingTypeResponseDto[]> {
    const genderList = await this.trainingService.getAll();
    return genderList;
  }
}
