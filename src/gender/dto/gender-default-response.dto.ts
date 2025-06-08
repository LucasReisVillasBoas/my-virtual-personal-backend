import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseResponse } from 'src/dto/base-response.dto';

class GenderDefaultResponse {
  @Expose()
  @ApiProperty()
  data?: any;
}

export class GenderDefaultResponseDto extends BaseResponse<GenderDefaultResponse> {}
