import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { BaseResponse } from 'src/dto/base-response.dto';

export class AdditionalInfoRegisterResponseDto {
  @Expose()
  @ApiProperty()
  @IsString()
  id: string;

  @Expose()
  @ApiProperty()
  @IsArray()
  @IsOptional()
  preExistingHealthConditions?: string[];

  @Expose()
  @ApiProperty()
  @IsArray()
  @IsOptional()
  medicationUse?: string[];

  @Expose()
  @ApiProperty()
  @IsString()
  @IsOptional()
  timeTrainingWeightlifting?: string;

  @Expose()
  @ApiProperty()
  @IsString()
  @IsOptional()
  trainingFrequency?: string;

  @Expose()
  @ApiProperty()
  @IsString()
  @IsOptional()
  timeAvailabilityPerTraining?: string;

  @Expose()
  @ApiProperty()
  @IsArray()
  @IsOptional()
  otherRegularPhysicalActivity?: string[];

  @Expose()
  @ApiProperty()
  @IsString()
  @IsOptional()
  likedDislikedExercises?: string;

  @Expose()
  @ApiProperty()
  @IsArray()
  @IsOptional()
  muscleFocus?: string[];
}

export class AdditionalInfoResponseDto {
  @Expose()
  @ApiProperty()
  additionalInfo?: any;

  @Expose()
  @ApiProperty()
  additionalInfos?: any;

  @Expose()
  @ApiProperty()
  additionalInfoDeleted?: any;
}

export class AdditionalInfoResponse extends BaseResponse<AdditionalInfoResponseDto> {}
