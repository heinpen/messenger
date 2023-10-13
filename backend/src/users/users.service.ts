import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from 'src/dto/registration.dto';
import { DeleteResult, Repository } from 'typeorm';
import { User } from './user.entity';

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

  findAllUsers(id: number): Promise<User[]> {
    return this.usersRepository
      .createQueryBuilder('user')
      .where('user.id != :id', { id })
      .getMany();
  }

  findUsers(id: number, searchQuery: string): Promise<User[] | null> {
    return this.usersRepository
      .createQueryBuilder('user')
      .where('user.id != :id', { id })
      .andWhere('user.username LIKE :searchQuery', {
        searchQuery: `%${searchQuery}%`,
      })
      .getMany();
  }

  findOneWithPassword(email: string): Promise<User | null> {
    return this.usersRepository
      .createQueryBuilder('user')
      .addSelect('user.password') // Explicitly include the password field
      .where('user.email = :email', { email })
      .getOne();
  }

  findOneByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }

  findOneById(id: number): Promise<User | null> {
    return this.usersRepository
      .createQueryBuilder('user')
      .addSelect('user.email') // Explicitly include the email field
      .where('user.id = :id', { id })
      .getOne();
  }

  removeOne(id: number): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }
}
