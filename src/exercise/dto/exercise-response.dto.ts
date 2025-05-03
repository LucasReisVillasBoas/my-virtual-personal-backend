import { IsString } from 'class-validator';
import { GenericResponseDto } from '../../dto/generic-response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ExerciseResponseDto extends GenericResponseDto {
  @Expose()
  @ApiProperty()
  @IsString()
  muscleGroup: GenericResponseDto;
}
