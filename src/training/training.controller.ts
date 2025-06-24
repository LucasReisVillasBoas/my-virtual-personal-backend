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
import { Training } from 'src/entities/training/training.entity';
import { TrainingRegisterRequestDto } from 'src/training/dto/training-register-request.dto';
import { TrainingRegisterResponseDto } from 'src/training/dto/training-register-response.dto';
import { TrainingResponseDto } from 'src/training/dto/training-response.dto';
import { TrainingTypeResponseDto } from './dto/training-type-response.dto';
import { TrainingService } from './training.service';
import { filterTrainingFields } from 'src/utils/training.util';

@Controller('training')
@ApiTags('Training')
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @ApiResponse({
    status: 201,
    type: TrainingRegisterRequestDto,
    description: 'Training register',
  })
  @Post('/register')
  async register(
    @Body() trainingRegisterRequestDto: TrainingRegisterRequestDto,
  ): Promise<TrainingRegisterResponseDto> {
    const training = await this.trainingService.register(
      trainingRegisterRequestDto,
    );

    return new TrainingRegisterResponseDto('Training created', 201, {
      training: filterTrainingFields(training),
    });
  }

  @ApiResponse({
    status: 200,
    type: TrainingResponseDto,
    description: 'Training Type list',
    isArray: true,
  })
  @Get('/type')
  async listType(@Query('type') type: string): Promise<TrainingResponseDto> {
    const trainingListType = await this.trainingService.getAllByType(type);
    return new TrainingResponseDto('Training retrieved by type', 200, {
      trainingList: trainingListType,
    });
  }

  @ApiResponse({
    status: 200,
    type: TrainingResponseDto,
    description: 'Training list',
    isArray: true,
  })
  @Get('/all')
  async list(): Promise<TrainingResponseDto> {
    const trainingList = await this.trainingService.getAll();
    return new TrainingResponseDto('Training list retrieved', 200, {
      trainingList: trainingList,
    });
  }

  @ApiResponse({
    status: 200,
    type: TrainingResponseDto,
    description: 'Training details',
  })
  @Get()
  async getById(@Query('id') id: string): Promise<TrainingResponseDto> {
    const training = await this.trainingService.getById(id);
    return new TrainingResponseDto('Training retrieved by id', 200, {
      training: training,
    });
  }

  @ApiResponse({
    status: 200,
    type: TrainingResponseDto,
    description: 'Training updated',
  })
  @Put('/')
  async update(
    @Query('id') id: string,
    @Body() trainingRequestDto: Partial<Training>,
  ): Promise<TrainingResponseDto> {
    const training = await this.trainingService.update(id, trainingRequestDto);
    return new TrainingResponseDto('Training updated successfully', 200, {
      training: training,
    });
  }

  @ApiResponse({
    status: 200,
    type: TrainingResponseDto,
    description: 'Training deleted',
  })
  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<TrainingResponseDto> {
    const trainingDeleted = await this.trainingService.delete(id);
    return new TrainingResponseDto('Training deleted successfully', 200, {
      trainingDeleted: trainingDeleted,
    });
  }
}
