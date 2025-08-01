import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Restriction } from '../entities/restriction/restriction.entity';
import {
  RestrictionDefaultResponseDto
} from '../restriction/dto/restriction-default-response.dto';
import { RestrictionRegisterRequestDto } from '../restriction/dto/restriction-register-request.dto';
import { RestrictionRegisterResponseDto } from '../restriction/dto/restriction-register-response.dto';
import { RestrictionService } from '../restriction/restriction.service';

@Controller('restriction')
@ApiTags('Restriction')
export class RestrictionController {
  constructor(private readonly restrictionService: RestrictionService) {}

  @ApiResponse({
    status: 201,
    type: RestrictionRegisterRequestDto,
    description: 'Restriction register',
  })
  @Post('register')
  async register(
    @Body() restrictionRegisterRequestDto: RestrictionRegisterRequestDto,
  ): Promise<RestrictionRegisterResponseDto> {
    const restriction = await this.restrictionService.register(
      restrictionRegisterRequestDto,
    );

    return new RestrictionRegisterResponseDto('Restriction created', 201, {
      restriction: restriction,
    });
  }

  @ApiResponse({
    status: 200,
    type: RestrictionDefaultResponseDto,
    description: 'Restrictions list',
  })
  @Get('/all')
  async list(): Promise<RestrictionDefaultResponseDto> {
    const restrictions = await this.restrictionService.getAll();
    return new RestrictionDefaultResponseDto('Restriction list retrieved', 200, {restrictions: restrictions});
  }

  @ApiResponse({
    status: 200,
    type: RestrictionDefaultResponseDto,
    description: 'Restriction details',
  })
  @Get('/')
  async getById(
    @Query('id') id: string,
  ): Promise<RestrictionDefaultResponseDto> {
    const restriction = await this.restrictionService.getById(id);

    return new RestrictionDefaultResponseDto('Restriction retrieved', 200, {
      restriction: restriction,
    });
  }

  @ApiResponse({
    status: 200,
    type: RestrictionDefaultResponseDto,
    description: 'Restriction updated',
  })
  @Put('/')
  async update(
    @Query('id') id: string,
    @Body() restrictionRequestDto: Partial<Restriction>,
  ): Promise<RestrictionDefaultResponseDto> {
    const restriction = await this.restrictionService.update(
      id,
      restrictionRequestDto,
    );
    return new RestrictionDefaultResponseDto(
      'Restriction updated successfully',
      200,
      {
        restriction: restriction,
      },
    );
  }

  @ApiResponse({
    status: 200,
    type: RestrictionDefaultResponseDto,
    description: 'Restriction deleted',
  })
  @Delete('/:id')
  async delete(
    @Param('id') id: string,
  ): Promise<RestrictionDefaultResponseDto> {
    const restrictionDeleted = await this.restrictionService.delete(id);
    return new RestrictionDefaultResponseDto(
      'Restriction deleted successfully',
      200,
      {
        restrictionDeleted: restrictionDeleted,
      },
    );
  }
}
