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
import { Goals } from 'src/entities/goals/goals.entity';
import { GoalRegisterRequestDto } from 'src/goals/dto/goal-register-request.dto';
import { GoalRegisterResponseDto } from 'src/goals/dto/goal-register-response.dto';
import { GoalResponseDto } from 'src/goals/dto/goal-response.dto';
import { GoalsResponseDto } from 'src/goals/dto/goals-response.dto';
import { GoalsService } from 'src/goals/goals.service';

@Controller('goals')
@ApiTags('Goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @ApiResponse({
    status: 201,
    type: GoalRegisterRequestDto,
    description: 'Goal register',
  })
  @Post('register')
  async register(
    @Body() goalRegisterRequestDto: GoalRegisterRequestDto,
    @Query('userId') userId: string,
  ): Promise<GoalRegisterResponseDto> {
    const goal = await this.goalsService.register(
      goalRegisterRequestDto,
      userId,
    );

    return new GoalRegisterResponseDto('Goal created', 201, { goal: goal });
  }

  @ApiResponse({
    status: 200,
    type: GoalResponseDto,
    description: 'Goals list',
  })
  @Get('/all')
  async list(): Promise<GoalResponseDto> {
    const goals = await this.goalsService.getAll();
    return new GoalResponseDto('Goals list retrieved successfully', 200, {goals: goals});
  }

  @ApiResponse({
    status: 200,
    type: GoalResponseDto,
    description: 'Goals details',
  })
  @Get('/')
  async getById(@Query('id') goalId: string): Promise<GoalResponseDto> {
    const goal = await this.goalsService.getById(goalId);

    return new GoalResponseDto('Goals retrieved', 200, {
      goal: goal,
    });
  }

  @ApiResponse({
    status: 200,
    type: GoalResponseDto,
    description: 'Goals updated',
  })
  @Put('/')
  async update(
    @Query('id') id: string,
    @Body() goalsRequestDto: Partial<Goals>,
  ): Promise<GoalResponseDto> {
    const goals = await this.goalsService.update(id, goalsRequestDto);
    return new GoalResponseDto('Goals updated successfully', 200, {
      goal: goals,
    });
  }

  @ApiResponse({
    status: 200,
    type: GoalResponseDto,
    description: 'Gender deleted',
  })
  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<GoalResponseDto> {
    const goalsDeleted = await this.goalsService.delete(id);
    return new GoalResponseDto('Goals deleted successfully', 200, {
      goalDeleted: goalsDeleted,
    });
  }
}
