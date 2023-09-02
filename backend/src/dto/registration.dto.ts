import { IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  @Length(0, 50)
  firstName: string;

  @IsOptional()
  @Length(0, 50)
  lastName: string;
}
