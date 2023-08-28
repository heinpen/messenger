import {
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Delete,
} from '@nestjs/common';

import { UsersService } from 'src/users/users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  async findAllUsers(): Promise<User[]> {
    try {
      return await this.userService.findAll();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get('/:username')
  async findUser(@Param() params: any): Promise<User | string> {
    try {
      const user = await this.userService.findOne(params.username);
      return user ? user : 'No user found';
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete('/:id')
  async removeUser(@Param() params: any): Promise<string> {
    try {
      const deleteResult = await this.userService.removeOne(params.id);
      return deleteResult.affected === 1
        ? 'User deleted successfully'
        : 'User not found';
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
