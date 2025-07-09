import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseResponse } from '../../dto/base-response.dto';

class MuscleGroupDefaultResponse {
  @Expose()
  @ApiProperty()
  muscleGroup?: any;

  @Expose()
  @ApiProperty()
  muscleGroups?: any;

  @Expose()
  @ApiProperty()
  muscleGroupDeleted?: boolean;
}

export class MuscleGroupDefaultResponseDto extends BaseResponse<MuscleGroupDefaultResponse> {}
