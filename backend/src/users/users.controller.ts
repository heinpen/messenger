import {
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Req,
} from '@nestjs/common';

import { Public } from 'src/decorators/public.decorator';
import { UsersService } from 'src/users/users.service';
import { User } from './user.entity';

interface ProfileRequest extends Request {
  user: {
    sub: number;
    username: string;
  };
}

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Public()
  @Get()
  async findAllUsers(): Promise<User[]> {
    try {
      const users = await this.userService.findAll();
      return users;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get('/profile')
  async findProfile(@Req() request: ProfileRequest): Promise<User | null> {
    const user = await this.userService.findOneById(request.user.sub);
    return user;
  }

  @Public()
  @Get('/:username')
  async findUser(@Param() params: any): Promise<User | string> {
    const user = await this.userService.findOneByUsername(params.username);
    console.log(user, 'user');
    return user ? user : 'No user found';
  }

  @Delete('/:id')
  async removeUser(@Param() params: any): Promise<string> {
    const deleteResult = await this.userService.removeOne(params.id);
    return deleteResult.affected === 1
      ? 'User deleted successfully'
      : 'User not found';
  }
}
