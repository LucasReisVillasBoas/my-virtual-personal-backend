import { BadRequestException, Injectable } from '@nestjs/common';
import { Goals } from '../entities/goals/goals.entity';
import { GoalRegisterRequestDto } from './dto/goal-register-request.dto';
import { Goal } from './dto/goal-response.dto';
import { GoalsResponseDto } from './dto/goals-response.dto';
import { UserService } from '../user/user.service';
import { GoalsRepository } from './goals.repository';
import { generateGoalsCode } from '../utils/goals.util';
import { GoalResponseData } from './dto/goal-register-response.dto';

@Injectable()
export class GoalsService {
  constructor(
    private readonly goalsRepository: GoalsRepository,
    private readonly userService: UserService,
  ) {}

  async register(
    goalRegisterRequestDto: GoalRegisterRequestDto,
    userId: string,
  ): Promise<GoalResponseData> {
    const user = await this.userService.getById(userId);

    if (!user) {
      throw new BadRequestException('error-user-not_found');
    }

    const existingGoal = await this.goalsRepository.findAll();
    const code = generateGoalsCode(goalRegisterRequestDto.code, existingGoal);

    const goals = this.goalsRepository.create({
      code: code,
      description: goalRegisterRequestDto.description,
      active: goalRegisterRequestDto.active,
      user: user,
    });

    await this.goalsRepository.flush();

    return goals;
  }

  async getById(id: string): Promise<Goals> {
    const goal = await this.goalsRepository.findOne({ id });
    return goal;
  }

  async getAll(): Promise<GoalsResponseDto[]> {
    const goalsList = await this.goalsRepository.findAll();

    return goalsList;
  }

  async update(id: string, updateData: Partial<Goals>): Promise<Goal> {
    const goal = await this.goalsRepository.findOne({ id });

    if (!goal) {
      throw new BadRequestException('error-goal-not_found');
    }
    Object.assign(goal, updateData);
    await this.goalsRepository.flush();

    return goal;
  }

  async delete(id: string): Promise<boolean> {
    const goals = await this.goalsRepository.findOne({ id });

    if (!goals) {
      throw new BadRequestException('error-gender-not_found');
    }

    const goalsDeleted = this.goalsRepository.remove(goals);
    await this.goalsRepository.flush();
    return goalsDeleted != null;
  }
}
