import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseResponse } from 'src/dto/base-response.dto';

class MuscleGroupDefaultResponse {
  @Expose()
  @ApiProperty()
  data?: any;
}

export class MuscleGroupDefaultResponseDto extends BaseResponse<MuscleGroupDefaultResponse> {}
