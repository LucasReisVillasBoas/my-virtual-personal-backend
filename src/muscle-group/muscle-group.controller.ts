import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MuscleGroupService } from './muscle-group.service';
import { MuscleGroupResponseDto } from './dto/muscle-group-response.dto';

@Controller('muscle-group')
@ApiTags('Muscle Group')
export class MuscleGroupController {
  constructor(private readonly muscleGroupService: MuscleGroupService) {}

  @ApiResponse({
    status: 200,
    type: MuscleGroupResponseDto,
    description: 'Muscle Group list',
    isArray: true,
  })
  @Get()
  async list(): Promise<MuscleGroupResponseDto[]> {
    const genderList = await this.muscleGroupService.getAll();
    return genderList;
  }
}
