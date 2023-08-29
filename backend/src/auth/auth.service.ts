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

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async registerUser(userData: RegisterUserDto): Promise<User> {
    const user = this.usersService.createUser(userData);
    const hashedPasswordUser = await this.hashPassword(user);
    return this.usersService.saveUser(hashedPasswordUser);
  }

  async hashPassword(user: RegisterUserDto): Promise<RegisterUserDto> {
    const newPassword = await bcrypt.hash(user.password, 10);
    return { ...user, password: newPassword };
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

    console.log(user.password);

    // TODO: Generate a JWT and return it here
    // instead of the user object
    return user;
  }
}
