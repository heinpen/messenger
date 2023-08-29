import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterUserDto } from 'src/dto/registration.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  createUser(userData: RegisterUserDto): RegisterUserDto {
    return this.usersRepository.create(userData);
  }

  saveUser(user: RegisterUserDto): Promise<User> {
    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneWithPassword(email: string): Promise<User | null> {
    return this.usersRepository
      .createQueryBuilder('user')
      .addSelect('user.password') // Explicitly include the password field
      .where('user.email = :email', { email })
      .getOne();
  }

  findOne(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }

  removeOne(id: number): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }
}
