import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExerciseResponseDto } from './dto/exercise-response.dto';
import { Exercise } from 'src/entities/exercise/exercise.entity';
import { ExerciseDefaultResponseDto } from 'src/exercise/dto/exercise-default-response.dto';

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
  @Get('/all')
  async list(): Promise<ExerciseResponseDto[]> {
    const exerciseList = await this.exerciseService.getAll();
    return exerciseList;
  }

  @ApiResponse({
    status: 200,
    type: ExerciseResponseDto,
    description: 'Exercise details',
  })
  @Get('/')
  async details(@Query('id') id: string): Promise<ExerciseResponseDto> {
    const exercise = await this.exerciseService.getById(id);
    return exercise;
  }

  @ApiResponse({
    status: 200,
    type: ExerciseResponseDto,
    description: 'Exercise details by code',
  })
  @Get('/code/:code')
  async detailsByCode(
    @Param('code') code: string,
  ): Promise<ExerciseResponseDto> {
    const exercise = await this.exerciseService.getByCode(code);
    return exercise;
  }

  @ApiResponse({
    status: 200,
    type: ExerciseDefaultResponseDto,
    description: 'Exercise updated successfully',
  })
  @Put('/')
  async update(
    @Query('id') id: string,
    @Body() userRegisterRequestDto: Partial<Exercise>,
  ) {
    const exerciseUpdated = await this.exerciseService.update(
      id,
      userRegisterRequestDto,
    );

    return new ExerciseDefaultResponseDto(
      'Exercise updated successfully',
      200,
      {
        data: exerciseUpdated,
      },
    );
  }

  @ApiResponse({
    status: 200,
    type: ExerciseDefaultResponseDto,
    description: 'Exercise deleted successfully',
  })
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    const exerciseDeleted = await this.exerciseService.delete(id);

    return new ExerciseDefaultResponseDto(
      'Exercise deleted successfully',
      200,
      {
        data: { exerciseDeleted: exerciseDeleted },
      },
    );
  }
}
