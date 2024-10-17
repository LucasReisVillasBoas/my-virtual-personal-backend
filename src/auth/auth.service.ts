import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
//import * as bcrypt from 'bcryptjs';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { User } from 'src/entities/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateLogin(loginDto: LoginDto): Promise<User> {
    const { email, password } = loginDto;

    const user = await this.userService.getByEmail(email);

    if (!user || password !== user.password) {
      return null;
    }

    return user;
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const user: User = await this.validateLogin(loginDto);
    if (!user) {
      throw new BadRequestException('error-user-not_found');
    }

    const payload = { username: user.email, sub: user.id };
    const loginResponseDto = new LoginResponseDto();
    loginResponseDto.token = this.jwtService.sign(payload);

    return loginResponseDto;
  }
}
