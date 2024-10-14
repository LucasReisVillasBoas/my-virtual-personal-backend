import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserExistsResponseDto {
  @Expose()
  @ApiProperty()
  exists: boolean;
}
