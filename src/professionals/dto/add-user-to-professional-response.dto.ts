import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class AddUserToProfessionalResponseDto {
  @Expose()
  @ApiProperty()
  @IsString()
  professional_id: string;

  @Expose()
  @ApiProperty()
  @IsString()
  user_id: string;
}