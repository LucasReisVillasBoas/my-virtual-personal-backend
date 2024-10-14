import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @Expose()
  @ApiProperty()
  @IsEmail()
  email: string;

  @Expose()
  @ApiProperty()
  @IsString()
  password: string;
}
