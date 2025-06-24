import { t } from '@mikro-orm/core';
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
import { TrainingExercise } from 'src/entities/training-exercise/training-exercise.entity';
import {
  TrainingExerciseDefaultResponseDto,
  TrainingExerciseResponse,
} from 'src/training-exercise/dto/training-exercise-default-response.dto';
import { TrainingExerciseRegisterRequestDto } from 'src/training-exercise/dto/training-exercise-register-request.dto';
import { TrainingExerciseRegisterResponseDto } from 'src/training-exercise/dto/training-exercise-register-response.dto';
import { TrainingExerciseResponseGenericDto } from 'src/training-exercise/dto/training-exercise-response.dto';
import { TrainingExerciseService } from 'src/training-exercise/training-exercise.service';

@Controller('training-exercise')
@ApiTags('training-exercise')
export class TrainingExerciseController {
  constructor(
    private readonly trainingExerciseService: TrainingExerciseService,
  ) {}

  @ApiResponse({
    status: 201,
    type: TrainingExerciseRegisterRequestDto,
    description: 'Training exercise register',
  })
  @Post('/register')
  async register(
    @Body() trainingExerciseRegisterRequest: TrainingExerciseRegisterRequestDto,
  ): Promise<TrainingExerciseRegisterResponseDto> {
    const response = await this.trainingExerciseService.create(
      trainingExerciseRegisterRequest,
    );
    return new TrainingExerciseRegisterResponseDto(
      'Training exercise created',
      201,
      { trainingExercise: response },
    );
  }

  @ApiResponse({
    status: 200,
    type: TrainingExerciseDefaultResponseDto,
    description: 'Training exercise found',
  })
  @Get('/all')
  async getAll(): Promise<TrainingExerciseDefaultResponseDto> {
    const trainingExercises = await this.trainingExerciseService.findAll();
    return new TrainingExerciseDefaultResponseDto(
      'Training exercise found',
      200,
      { trainingExercises: trainingExercises },
    );
  }

  @ApiResponse({
    status: 200,
    type: TrainingExerciseDefaultResponseDto,
    description: 'Training exercise found',
  })
  @Get('/')
  async getById(
    @Query('id') id: string,
  ): Promise<TrainingExerciseDefaultResponseDto> {
    const trainingExercise = await this.trainingExerciseService.findById(id);

    return new TrainingExerciseDefaultResponseDto(
      'Training exercise found',
      200,
      {
        trainingExercise: trainingExercise,
      },
    );
  }

  @ApiResponse({
    status: 200,
    type: TrainingExerciseDefaultResponseDto,
    description: 'Training exercise updated successfully',
  })
  @Put('/')
  async update(
    @Query('id') id: string,
    @Body() updateDto: Partial<TrainingExercise>,
  ): Promise<TrainingExerciseDefaultResponseDto> {
    const trainingExercise = await this.trainingExerciseService.update(
      id,
      updateDto,
    );
    return new TrainingExerciseDefaultResponseDto(
      'Training exercise updated successfully',
      200,
      { trainingExercise: trainingExercise },
    );
  }

  @ApiResponse({
    status: 200,
    type: TrainingExerciseDefaultResponseDto,
    description: 'Training exercise deleted successfully',
  })
  @Delete('/:id')
  async delete(
    @Param('id') id: string,
  ): Promise<TrainingExerciseDefaultResponseDto> {
    const trainingExerciseDeleted =
      await this.trainingExerciseService.delete(id);
    return new TrainingExerciseDefaultResponseDto(
      'Training exercise deleted successfully',
      200,
      { trainingExerciseDeleted: true },
    );
  }
}
