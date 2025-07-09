import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseResponse } from '../../dto/base-response.dto';
import { Exercise } from '../../entities/exercise/exercise.entity';
import { Training } from '../../entities/training/training.entity';

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
  trainingExercise?: any;

  @Expose()
  @ApiProperty()
  trainingExercises?: any;

  @Expose()
  @ApiProperty()
  trainingExerciseDeleted?: any;
}

export class TrainingExerciseDefaultResponseDto extends BaseResponse<TrainingExerciseResponse> {}
