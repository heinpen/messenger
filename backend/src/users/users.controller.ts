import { Controller, Delete, Get, Param, Query, Req } from '@nestjs/common';

import { Public } from 'src/decorators/public.decorator';
import { UsersService } from 'src/users/users.service';
import { User } from './user.entity';

interface GuardedRequest extends Request {
  user: {
    sub: number;
    username: string;
  };
}

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAllUsers(@Req() request: GuardedRequest): Promise<User[]> {
    const users = await this.userService.findAllUsers(request.user.sub);
    return users;
  }

  @Get('search')
  async findPeople(
    @Req() request: GuardedRequest,
    @Query('searchQuery') searchQuery: string,
  ): Promise<User[] | null> {
    const users = await this.userService.findUsers(
      request.user.sub,
      searchQuery,
    );
    return users;
  }

  // @Get('chats')
  // async findAllChats(@Req() request: GuardedRequest): Promise<User | null> {
  //   const user = await this.userService.findAllChats(request.user.sub);
  //   return user;
  // }

  // @Get('chats')
  // async searchChats(@Req() request: GuardedRequest): Promise<User | null> {
  //   const user = await this.userService.searchChats();
  //   return user;
  // }

  @Get('profile')
  async findProfile(@Req() request: GuardedRequest): Promise<User | null> {
    const user = await this.userService.findOneById(request.user.sub);
    return user;
  }

  @Public()
  @Get(':username')
  async findUser(@Param() params: any): Promise<User | string> {
    const user = await this.userService.findOneByUsername(params.username);
    return user ? user : 'No user found';
  }

  @Delete(':id')
  async removeUser(@Param() params: any): Promise<string> {
    const deleteResult = await this.userService.removeOne(params.id);
    return deleteResult.affected === 1
      ? 'User deleted successfully'
      : 'User not found';
  }
}
