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

@Controller('auth')
@UseFilters(new HttpExceptionFilter())
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async createUser(@Body() userData: User): Promise<string> {
    try {
      await this.usersService.createUser(userData);
      return 'User created successfully';
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
