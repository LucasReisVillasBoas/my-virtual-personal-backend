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
import { Restriction } from 'src/entities/restriction/restriction.entity';
import {
  RestrictionDefaultResponseDto
} from 'src/restriction/dto/restriction-default-response.dto';
import { RestrictionRegisterRequestDto } from 'src/restriction/dto/restriction-register-request.dto';
import { RestrictionRegisterResponseDto } from 'src/restriction/dto/restriction-register-response.dto';
import { RestrictionResponseDto } from 'src/restriction/dto/restriction-response.dto';
import { RestrictionService } from 'src/restriction/restriction.service';

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
      data: restriction,
    });
  }

  @ApiResponse({
    status: 200,
    type: RestrictionResponseDto,
    description: 'Restrictions list',
  })
  @Get('/all')
  async list(): Promise<RestrictionResponseDto[]> {
    const restrictions = await this.restrictionService.getAll();
    return restrictions;
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
      data: restriction,
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
        data: restriction,
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
        data: restrictionDeleted,
      },
    );
  }
}
