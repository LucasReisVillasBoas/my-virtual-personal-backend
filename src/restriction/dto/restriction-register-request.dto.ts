import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsArray, IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

@Exclude()
export class RestrictionRegisterRequestDto {
  @Expose()
  @ApiProperty()
  @IsString()
  code: string;

  @Expose()
  @ApiProperty()
  @IsString()
  description: string;
}
