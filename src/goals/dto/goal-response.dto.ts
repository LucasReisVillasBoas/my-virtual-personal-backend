import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseResponse } from 'src/dto/base-response.dto';

export class Goal {
  @Expose()
  @ApiProperty()
  code: string;

  @Expose()
  @ApiProperty()
  description: string;

  @Expose()
  @ApiProperty()
  active: boolean;
}

class GoalsResponse {
  @Expose()
  @ApiProperty()
  data?: any;
}

export class GoalResponseDto extends BaseResponse<GoalsResponse> {}
