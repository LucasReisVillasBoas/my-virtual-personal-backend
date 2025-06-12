import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class ExerciseRegisterRequestDto {
  @Expose()
  @ApiProperty()
  @IsString()
  description: string;

  @Expose()
  @ApiProperty()
  @IsString()
  muscleGroupCode: string;

  @Expose()
  @ApiProperty()
  type: 'M' | 'H' | 'B' | 'C' | 'F';
}
