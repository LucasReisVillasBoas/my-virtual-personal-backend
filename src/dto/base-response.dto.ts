import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export abstract class BaseResponse<T> {
  @Expose()
  @ApiProperty()
  @IsNumber()
  statusCode: HttpStatus;

  @Expose()
  @ApiProperty()
  @IsString()
  message: string;

  @Expose()
  @ApiProperty()
  data?: T | T[];

  error?: string;

  constructor(
    message?: string,
    statusCode?: HttpStatus,
    data?: T,
    error?: string,
  ) {
    this.statusCode = statusCode ?? HttpStatus.OK;
    this.message = message ?? '';
    if (data) this.data = data;
    if (error) this.error = error;
  }
}
