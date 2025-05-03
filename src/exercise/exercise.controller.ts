import { Controller, Get } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExerciseResponseDto } from './dto/exercise-response.dto';

@Controller('exercise')
@ApiTags('Exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @ApiResponse({
    status: 200,
    type: ExerciseResponseDto,
    description: 'Exercise list',
    isArray: true,
  })
  @Get()
  async list(): Promise<ExerciseResponseDto[]> {
    const exerciseList = await this.exerciseService.getAll();
    return exerciseList;
  }
}
