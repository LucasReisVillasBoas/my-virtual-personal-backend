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
  restriction?: any;

  @Expose()
  @ApiProperty()
  restrictions?: any;

  @Expose()
  @ApiProperty()
  restrictionDeleted?: any;
}

export class RestrictionDefaultResponseDto extends BaseResponse<RestrictionResponse> {}
