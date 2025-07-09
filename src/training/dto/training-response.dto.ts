import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseResponse } from '../../dto/base-response.dto';

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
  training?: any;

  @Expose()
  @ApiProperty()
  trainingList?: any;

  @Expose()
  @ApiProperty()
  trainingDeleted?: any;
}

export class TrainingResponseDto extends BaseResponse<TrainingResponse> {}
