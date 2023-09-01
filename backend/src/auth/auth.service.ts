import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/user.entity';
import { RegisterUserDto } from 'src/dto/registration.dto';
import { LoginUserDto } from 'src/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './refresh-token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

    if (!isPasswordMatching) throw new UnauthorizedException();

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

  private async saveRefreshToken(
    refreshToken: string,
    id: number,
    tokenId?: number,
  ) {
    const refreshTokenEntity = this.tokenRepository.create({
      id: tokenId,
      token: refreshToken,
      userId: id,
    });

    await this.tokenRepository.save(refreshTokenEntity);
  }

  async refreshToken(refreshToken: string) {
    if (!refreshToken) throw new UnauthorizedException('1');

    const token = await this.tokenRepository.findOneBy({ token: refreshToken });
    if (!token) throw new UnauthorizedException('2');

    const user = await this.usersService.findOne({ id: token.userId });
    if (!user) throw new UnauthorizedException('3');

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      await this.getTokens(user.id, user.username);

    await this.saveRefreshToken(newRefreshToken, user.id, token.id);

    return {
      newAccessToken,
      newRefreshToken,
    };
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
          expiresIn: '15m',
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
