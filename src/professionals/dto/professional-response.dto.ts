import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseResponse } from 'src/dto/base-response.dto';
import { AddUserToProfessionalResponseDto } from './add-user-to-professional-response.dto';

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
