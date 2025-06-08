import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsArray, IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

@Exclude()
export class GoalRegisterRequestDto {
  @Expose()
  @ApiProperty()
  @IsString()
  code: string;

  @Expose()
  @ApiProperty()
  @IsString()
  description: string;

  @Expose()
  @ApiProperty()
  @IsBoolean()
  active: boolean;

  @Expose()
  @ApiProperty()
  @IsString()
  age: string;

  @Expose()
  @ApiProperty()
  @IsString()
  height: string;

  @Expose()
  @ApiProperty()
  @IsString()
  weight: string;

  @Expose()
  @ApiProperty()
  @IsString()
  genderId: string;

  @Expose()
  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

  @Expose()
  @ApiProperty()
  @IsString()
  role: string;

  @Expose()
  @ApiProperty()
  @IsArray()
  @IsOptional()
  clients_id: string[];

  @Expose()
  @ApiProperty()
  @IsArray()
  @IsOptional()
  professionals_id: string[];
}
