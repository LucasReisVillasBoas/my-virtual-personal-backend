import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseResponse } from 'src/dto/base-response.dto';
import { Exercise } from 'src/entities/exercise/exercise.entity';
import { Training } from 'src/entities/training/training.entity';

export class TrainingExerciseResponseData {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  sets: number;

  @Expose()
  @ApiProperty()
  reps: string;

  @Expose()
  @ApiProperty()
  rest_time: string;

  @Expose()
  @ApiProperty()
  training: Training;

  @Expose()
  @ApiProperty()
  exercise: Exercise;
}

export class TrainingExerciseResponse {
  @Expose()
  @ApiProperty()
  data?: any;
}

export class TrainingExerciseDefaultResponseDto extends BaseResponse<TrainingExerciseResponse> {}
