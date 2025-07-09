import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseResponse } from '../../dto/base-response.dto';

class ProfessionalResponse {
  @Expose()
  @ApiProperty()
  professional?: any;

  @Expose()
  @ApiProperty()
  professionals?: any;

  @Expose()
  @ApiProperty()
  professionalDeleted?: any;
}

export class ProfessionalResponseDto extends BaseResponse<ProfessionalResponse> {}
