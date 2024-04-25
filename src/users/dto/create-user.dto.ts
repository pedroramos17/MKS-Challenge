import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(2, 50)
  name: string;

  @IsNotEmpty()
  @Length(2, 50)
  username: string;

  @IsNotEmpty()
  @Length(3, 50)
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(6, 50)
  password: string;
}
