import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';
import { BaseResponse } from '../../dto/base-response.dto';

export class RestrictionResponseData {
  @Expose()
  @ApiProperty()
  @IsString()
  id: string;

  @Expose()
  @ApiProperty()
  @IsString()
  code: string;

  @Expose()
  @ApiProperty()
  @IsString()
  description: string;
}

class RestrictionResponseDto {
  @Expose()
  @ApiProperty()
  restriction: any;
}

export class RestrictionRegisterResponseDto extends BaseResponse<RestrictionResponseDto> {}
