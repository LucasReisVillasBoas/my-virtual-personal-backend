import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { BaseResponse } from 'src/dto/base-response.dto';
import { TrainingExercise } from 'src/entities/training-exercise/training-exercise.entity';
import { TrainingType } from 'src/entities/training/training-type.entity';

export class TrainingResponseData {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  active: boolean;

  @Expose()
  @ApiProperty()
  trainingType: any;

  @Expose()
  @ApiProperty()
  goals: any;

  @Expose()
  @ApiProperty()
  trainingExerciseList?: any[];

  @Expose()
  @ApiProperty()
  user: any;
}

export class TrainingResponse {
  @Expose()
  @ApiProperty()
  data?: any;
}

export class TrainingResponseDto extends BaseResponse<TrainingResponse> {}
