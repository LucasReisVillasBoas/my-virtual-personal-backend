import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseResponse } from 'src/dto/base-response.dto';

class ExerciseDefaultResponse {
  @Expose()
  @ApiProperty()
  exercise?: any;

  @Expose()
  @ApiProperty()
  exercises?: any;

  @Expose()
  @ApiProperty()
  exerciseDeleted?: boolean;
}

export class ExerciseDefaultResponseDto extends BaseResponse<ExerciseDefaultResponse> {}
