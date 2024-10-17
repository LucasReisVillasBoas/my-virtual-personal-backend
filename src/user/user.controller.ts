import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('User')
export class UserController {
  @ApiResponse({
    status: 200,
    //type: LoginResponseDto,
    description: 'User login',
  })
  @Post('register')
  async register(@Req() req: Request, @Body() loginDto: any) {}
}
