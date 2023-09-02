import { IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ unique: true, select: false })
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
