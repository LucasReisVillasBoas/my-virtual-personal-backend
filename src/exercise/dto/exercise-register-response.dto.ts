import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { BaseResponse } from '../../dto/base-response.dto';

export class ExerciseRegisterResponseDto {
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

class ExerciseRegisterResponseData {
  @Expose()
  @ApiProperty()
  data: any;
}

export class ExerciseRegisterResponse extends BaseResponse<ExerciseRegisterResponseData> {}
