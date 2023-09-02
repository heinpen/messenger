import { Body, Controller, Post, Req, Res, UseFilters } from '@nestjs/common';
import { Request, Response } from 'express';
import { Public } from 'src/decorators/public.decorator';
import { LoginUserDto } from 'src/dto/login.dto';
import { RegisterUserDto } from 'src/dto/registration.dto';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
@UseFilters(new HttpExceptionFilter())
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Public()
  @Post('register')
  async registerUser(
    @Body() userData: RegisterUserDto,
  ): Promise<{ message: string }> {
    await this.authService.registerUser(userData);

    return { message: 'User registered successfully' };
  }

  @Public()
  @Post('login')
  async loginUser(
    @Body() userData: LoginUserDto,
    @Res() response: Response,
  ): Promise<void> {
    const { accessToken, refreshToken } = await this.authService.loginUser(
      userData,
    );

    response.cookie('ACCESS_TOKEN', accessToken, {
      httpOnly: true,
    });

    response.cookie('REFRESH_TOKEN', refreshToken, {
      httpOnly: true,
    });

    response.json({ message: 'User logged in successfully' });
  }

  @Public()
  @Post('refresh-token')
  async refreshToken(@Req() req: Request, @Res() response: Response) {
    const refreshToken = req.cookies['REFRESH_TOKEN'];

    const { newAccessToken, newRefreshToken } =
      await this.authService.refreshToken(refreshToken);

    response.cookie('ACCESS_TOKEN', newAccessToken, {
      httpOnly: true,
    });

    response.cookie('REFRESH_TOKEN', newRefreshToken, {
      httpOnly: true,
    });

    response
      .status(200)
      .json({ message: 'Access token refreshed successfully' });
  }
}
