import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseResponse } from 'src/dto/base-response.dto';

class ProfessionalResponse {
  @Expose()
  @ApiProperty()
  data?: any;
}

export class ProfessionalResponseDto extends BaseResponse<ProfessionalResponse> {}
