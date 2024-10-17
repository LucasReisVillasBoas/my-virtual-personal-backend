import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';

@Exclude()
export class UserRegisterRequestDto {
  @Expose()
  @ApiProperty()
  @IsString()
  password: string;

  @Expose()
  @ApiProperty()
  @IsString()
  fullName: string;

  @Expose()
  @ApiProperty()
  @IsString()
  @IsOptional()
  nickname: string;

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
}
