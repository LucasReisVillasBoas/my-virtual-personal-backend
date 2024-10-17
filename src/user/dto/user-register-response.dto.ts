import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { BaseResponse } from '../../dto/base-response.dto';

class UserRegisterDto {
  @Expose()
  @ApiProperty()
  @IsString()
  id: string;

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
  @IsEmail()
  email: string;
}

class UserData {
  @Expose()
  @ApiProperty({ type: UserRegisterDto })
  user: UserRegisterDto;
}

export class UserRegisterResponseDto extends BaseResponse<UserData> {}
