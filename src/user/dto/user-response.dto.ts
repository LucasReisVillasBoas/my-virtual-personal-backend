import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseResponse } from 'src/dto/base-response.dto';

class UserResponse {
  @Expose()
  @ApiProperty()
  data?: any;
}

export class UserResponseDto extends BaseResponse<UserResponse> {}
