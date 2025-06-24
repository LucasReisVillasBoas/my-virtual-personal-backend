import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseResponse } from 'src/dto/base-response.dto';

class GenderDefaultResponse {
  @Expose()
  @ApiProperty()
  gender?: any;

  @Expose()
  @ApiProperty()
  genders?: any;

  @Expose()
  @ApiProperty()
  genderDeleted?: boolean;
}

export class GenderDefaultResponseDto extends BaseResponse<GenderDefaultResponse> {}
