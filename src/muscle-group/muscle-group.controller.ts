import { Body, Controller, Delete, Get, Param, Put, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MuscleGroupService } from './muscle-group.service';
import { MuscleGroupResponseDto } from './dto/muscle-group-response.dto';
import { MuscleGroupDefaultResponseDto } from 'src/muscle-group/dto/ muscle-group-default-response.dto';
import { MuscleGroup } from 'src/entities/muscle-group/muscle-group.entity';

@Controller('muscle-group')
@ApiTags('Muscle Group')
export class MuscleGroupController {
  constructor(private readonly muscleGroupService: MuscleGroupService) {}

  @ApiResponse({
    status: 200,
    type: MuscleGroupDefaultResponseDto,
    description: 'Muscle Group list',
    isArray: true,
  })
  @Get('/all')
  async list(): Promise<MuscleGroupDefaultResponseDto> {
    const muscleGroupList = await this.muscleGroupService.getAll();
    return new MuscleGroupDefaultResponseDto('Muscle Group list retrieved successfully', 200, { muscleGroups: muscleGroupList });
  }

  @ApiResponse({
    status: 200,
    type: MuscleGroupDefaultResponseDto,
    description: 'Muscle Group details'
  })
  @Get()
  async getById(@Query('id') id: string): Promise<MuscleGroupDefaultResponseDto> {
    const muscleGroup = await this.muscleGroupService.getById(id);
    return new MuscleGroupDefaultResponseDto('Muscle Group details retrieved successfully', 200, { muscleGroup: muscleGroup });
  }

  @ApiResponse({
    status: 200,
    type: MuscleGroupDefaultResponseDto,
    description: 'Muscle Group details by code'
  })
  @Get('/code/:code')
  async getByCode(@Param('code') code: string): Promise<MuscleGroupDefaultResponseDto> {
    const muscleGroup = await this.muscleGroupService.getByCode(code);
    return new MuscleGroupDefaultResponseDto('Muscle Group details retrieved successfully', 200, { muscleGroup: muscleGroup });
  }

  @ApiResponse({
      status: 200,
      type: MuscleGroupDefaultResponseDto,
      description: 'Muscle Group updated',
    })
    @Put('/')
    async update(
      @Query('id') id: string,
      @Body() muscleGroupRequestDto: Partial<MuscleGroup>,
    ): Promise<MuscleGroupDefaultResponseDto> {
      const muscleGroup = await this.muscleGroupService.update(id, muscleGroupRequestDto);
      return new MuscleGroupDefaultResponseDto('Muscle Group updated successfully', 200, {
        muscleGroup: muscleGroup,
      });
    }
  
    @ApiResponse({
      status: 200,
      type: MuscleGroupDefaultResponseDto,
      description: 'Muscle Group deleted',
    })
    @Delete('/:id')
    async delete(@Param('id') id: string): Promise<MuscleGroupDefaultResponseDto> {
      const muscleGroup = await this.muscleGroupService.delete(id);
      return new MuscleGroupDefaultResponseDto('Muscle Group deleted successfully', 200, {
        muscleGroupDeleted: muscleGroup,
      });
    }
}
