import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { TrainingExercise } from 'src/entities/training-exercise/training-exercise.entity';

@Exclude()
export class TrainingExerciseRegisterRequestDto {
  @Expose()
  @ApiProperty()
  @IsNumber()
  sets: number;

  @Expose()
  @ApiProperty()
  @IsString()
  reps: string;

  @Expose()
  @ApiProperty()
  @IsString()
  restTime: string;

  @Expose()
  @ApiProperty()
  @IsString()
  trainingId: string;

  @Expose()
  @ApiProperty()
  @IsString()
  exerciseCode: string;
}
