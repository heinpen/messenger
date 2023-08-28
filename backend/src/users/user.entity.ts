import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
  MaxLength,
} from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsNotEmpty()
  username: string;

  @Column({ select: false })
  @IsNotEmpty()
  password: string;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column({ nullable: true })
  @IsOptional()
  @Length(0, 50)
  firstName: string;

  @Column({ nullable: true })
  @IsOptional()
  @Length(0, 50)
  lastName: string;

  @Column({ default: true })
  isActive: boolean;
}
