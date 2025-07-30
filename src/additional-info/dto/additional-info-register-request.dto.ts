import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  IsArray,
  IsOptional,
  IsString,
} from 'class-validator';

@Exclude()
export class AdditionalInfoRegisterRequestDto {
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
