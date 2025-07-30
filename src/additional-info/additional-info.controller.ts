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
import { AdditionalInfoService } from './additional-info.service';
import { AdditionalInfoRegisterRequestDto } from './dto/additional-info-register-request.dto';
import {
  AdditionalInfoResponse,
  AdditionalInfoResponseDto,
} from './dto/additional-info-register-response.dto';
import { AdditionalInfo } from 'src/entities/additional-info/additional-info.entity';

@Controller('additional-info')
@ApiTags('Additional Info')
export class AdditionalInfoController {
  constructor(private readonly additionalInfoService: AdditionalInfoService) {}
  @ApiResponse({
    status: 201,
    type: AdditionalInfoResponse,
    description: 'Additionals Infos registered successfully',
  })
  @Post('register')
  async register(
    @Body() body: AdditionalInfoRegisterRequestDto,
    @Query('userId') userId: string,
  ): Promise<AdditionalInfoResponse> {
    const additionalInfo = await this.additionalInfoService.register(
      body,
      userId,
    );

    return new AdditionalInfoResponse(
      'Additional Info created successfully',
      201,
      { additionalInfo: additionalInfo },
    );
  }

  @ApiResponse({
    status: 200,
    type: AdditionalInfoResponse,
    description: 'Additional Info found',
  })
  @Get('/')
  async getById(@Query('id') id: string): Promise<AdditionalInfoResponse> {
    const additionalInfo = await this.additionalInfoService.getById(id);
    return new AdditionalInfoResponse(
      'Additional Info retrieved successfully',
      200,
      { additionalInfo: additionalInfo },
    );
  }

  @ApiResponse({
    status: 200,
    type: AdditionalInfoResponseDto,
    description: 'Additionals Infos found',
  })
  @Get('/all')
  async getAll() {
    const additionalInfos = await this.additionalInfoService.getAll();
    return new AdditionalInfoResponse(
      'All Additional Infos retrieved successfully',
      200,
      { additionalInfos: additionalInfos },
    );
  }

  @ApiResponse({
    status: 200,
    type: AdditionalInfoResponse,
    description: 'Additional info updated successfully',
  })
  @Put('/')
  async update(
    @Query('id') id: string,
    @Body() body: Partial<AdditionalInfo>,
  ): Promise<AdditionalInfoResponse> {
    const additionalInfo = await this.additionalInfoService.update(id, body);
    return new AdditionalInfoResponse(
      'Additional Info updated successfully',
      200,
      { additionalInfo: additionalInfo },
    );
  }

  @ApiResponse({
    status: 200,
    type: AdditionalInfoResponse,
    description: 'Additional info deleted successfully',
  })
  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<AdditionalInfoResponse> {
    const isDeleted = await this.additionalInfoService.delete(id);
    return new AdditionalInfoResponse(
      'Additional Info deleted successfully',
      200,
      { additionalInfoDeleted: isDeleted },
    );
  }
}
