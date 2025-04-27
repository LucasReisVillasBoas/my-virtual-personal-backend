import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { BaseResponse } from '../../dto/base-response.dto';

export class ProfessionalResponseData {
  @Expose()
  @ApiProperty()
  @IsString()
  id: string;

  @Expose()
  @ApiProperty()
  @IsString()
  name: string;

  @Expose()
  @ApiProperty()
  @IsString()
  type: string;
}

class ProfessionalResponseDto {
  @Expose()
  @ApiProperty()
  professional: ProfessionalResponseData;
}

export class ProfessionalData extends BaseResponse<ProfessionalResponseDto> {}
