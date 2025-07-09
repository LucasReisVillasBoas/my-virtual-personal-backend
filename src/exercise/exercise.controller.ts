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
import { ExerciseService } from './exercise.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExerciseResponseDto } from './dto/exercise-response.dto';
import { Exercise } from '../entities/exercise/exercise.entity';
import { ExerciseDefaultResponseDto } from './dto/exercise-default-response.dto';
import { ExerciseRegisterRequestDto } from './dto/exercise-register-request.dto';
import { ExerciseRegisterResponse } from './dto/exercise-register-response.dto';

@Controller('exercise')
@ApiTags('Exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @ApiResponse({
    status: 201,
    type: ExerciseRegisterRequestDto,
    description: 'Exercise register',
  })
  @Post('register')
  async register(
    @Body() exerciseRegisterRequest: ExerciseRegisterRequestDto,
  ): Promise<ExerciseRegisterResponse> {
    const exercise = await this.exerciseService.register(
      exerciseRegisterRequest,
    );

    return new ExerciseRegisterResponse('Exercise created', 201, {
      exercise: exercise,
    });
  }

  @ApiResponse({
    status: 200,
    type: ExerciseResponseDto,
    description: 'Exercise list',
    isArray: true,
  })
  @Get('/all')
  async list(): Promise<ExerciseDefaultResponseDto> {
    const exerciseList = await this.exerciseService.getAll();
    return new ExerciseDefaultResponseDto(
      'Exercise list retrieved successfully',
      200,
      {
        exercises: exerciseList,
      },
    );
  }

  @ApiResponse({
    status: 200,
    type: ExerciseResponseDto,
    description: 'Exercise details',
  })
  @Get('/')
  async details(@Query('id') id: string): Promise<ExerciseDefaultResponseDto> {
    const exercise = await this.exerciseService.getById(id);
    return new ExerciseDefaultResponseDto(
      'Exercise details retrieved successfully by id',
      200,
      {
        exercise: exercise,
      },
    );
  }

  @ApiResponse({
    status: 200,
    type: ExerciseResponseDto,
    description: 'Exercise details by code',
  })
  @Get('/code/:code')
  async detailsByCode(
    @Param('code') code: string,
  ): Promise<ExerciseDefaultResponseDto> {
    const exercise = await this.exerciseService.getByCode(code);
    return new ExerciseDefaultResponseDto(
      'Exercise details retrieved successfully by code',
      200,
      {
        exercise: exercise,
      },
    );
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
        exercise: exerciseUpdated,
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
        exerciseDeleted: exerciseDeleted,
      },
    );
  }
}
