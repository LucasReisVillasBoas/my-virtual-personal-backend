import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseResponse } from 'src/dto/base-response.dto';

export class RestrictionResponseData {
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

class RestrictionResponse {
  @Expose()
  @ApiProperty()
  data?: any;
}

export class RestrictionDefaultResponseDto extends BaseResponse<RestrictionResponse> {}
