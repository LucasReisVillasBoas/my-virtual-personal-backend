import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
} from 'class-validator';
import { TrainingExercise } from 'src/entities/training-exercise/training-exercise.entity';

@Exclude()
export class TrainingRegisterRequestDto {
  @Expose()
  @ApiProperty()
  @IsBoolean()
  active: boolean;

  @Expose()
  @ApiProperty()
  @IsString()
  trainingType: string;

  @Expose()
  @ApiProperty()
  @IsString()
  goalsId: string;

  @Expose()
  @ApiProperty()
  @IsArray()
  trainingExerciseList?: TrainingExercise[];

  @Expose()
  @ApiProperty()
  @IsString()
  userId: string;
}
