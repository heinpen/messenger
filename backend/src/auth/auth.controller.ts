import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  UseFilters,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { RegisterUserDto } from 'src/dto/registration.dto';
import { LoginUserDto } from 'src/dto/login.dto';

@Controller('auth')
@UseFilters(new HttpExceptionFilter())
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('/register')
  async registerUser(
    @Body() userData: RegisterUserDto,
  ): Promise<{ message: string }> {
    await this.authService.registerUser(userData);
    return { message: 'User registered successfully' };
  }

  @Post('/login')
  async loginUser(
    @Body() userData: LoginUserDto,
  ): Promise<{ message: string }> {
    await this.authService.loginUser(userData);
    return { message: 'User logged in successfully' };
  }
}
