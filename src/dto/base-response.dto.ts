import { HttpStatus } from '@nestjs/common';

export abstract class BaseResponse<T> {
  statusCode: HttpStatus;
  message: string;
  data?: T;
  error?: string;

  constructor(
    message?: string,
    statusCode?: HttpStatus,
    data?: T,
    error?: string,
  ) {
    this.statusCode = statusCode ?? HttpStatus.OK;
    this.message = message ?? '';
    this.data = data;
    this.error = error;
  }
}
