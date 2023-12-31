import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from 'src/dto/login.dto';
import { RegisterUserDto } from 'src/dto/registration.dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { RefreshToken } from './refresh-token.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(RefreshToken)
    private tokenRepository: Repository<RefreshToken>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async registerUser(userData: RegisterUserDto): Promise<User> {
    const user = this.usersService.createUser(userData);

    const hashedPasswordUser = await this.hashPassword(user);
    return this.usersService.saveUser(hashedPasswordUser);
  }

  async loginUser(userData: LoginUserDto): Promise<any> {
    const { email, password: plainTextPassword } = userData;
    const user = await this.usersService.findOneWithPassword(email);

    if (!user)
      throw new NotFoundException('User with this email does not exist');

    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      user.password,
    );

    if (!isPasswordMatching)
      throw new UnauthorizedException('Password is wrong');

    const { accessToken, refreshToken } = await this.getTokens(
      user.id,
      user.username,
    );

    await this.saveRefreshToken(refreshToken, user.id);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(refreshToken: string) {
    if (!refreshToken)
      throw new UnauthorizedException('No refresh token, try to login');

    const token = await this.tokenRepository.findOneBy({ token: refreshToken });
    if (!token) throw new UnauthorizedException('No token in db');

    const user = await this.usersService.findOneById(token.userId);
    if (!user) throw new UnauthorizedException();

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      await this.getTokens(user.id, user.username);

    await this.saveRefreshToken(newRefreshToken, user.id);

    return {
      newAccessToken,
      newRefreshToken,
    };
  }

  async validateToken(accessToken: string) {
    if (!accessToken) throw new UnauthorizedException('No access token');

    try {
      await this.jwtService.verifyAsync(accessToken, {
        secret: process.env.ACCESS_TOKEN_SECRET,
      });
    } catch (e) {
      throw new UnauthorizedException('Invalid access token');
    }
  }

  async deleteRefreshToken(refreshToken: string) {
    await this.tokenRepository.delete({ token: refreshToken });
  }

  private async saveRefreshToken(
    refreshToken: string,
    userId: number,
  ) {
    const refreshTokenEntity = this.tokenRepository.create({
      token: refreshToken,
      userId,
    });

    await this.tokenRepository.save(refreshTokenEntity);
  }

  private async getTokens(userId: number, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: process.env.ACCESS_TOKEN_SECRET,
          expiresIn: '5s',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: process.env.REFRESH_TOKEN_SECRET,
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async hashPassword(user: RegisterUserDto): Promise<RegisterUserDto> {
    const newPassword = await bcrypt.hash(user.password, 10);
    return { ...user, password: newPassword };
  }
}
