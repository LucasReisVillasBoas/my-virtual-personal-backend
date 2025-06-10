import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';
import { BaseResponse } from '../../dto/base-response.dto';

export class GoalResponseData {
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
  @IsOptional()
  description?: string;

  @Expose()
  @ApiProperty()
  @IsBoolean()
  active: boolean;
}

class GoalResponseDto {
  @Expose()
  @ApiProperty()
  goal: GoalResponseData;
}

export class GoalRegisterResponseDto extends BaseResponse<GoalResponseDto> {}
