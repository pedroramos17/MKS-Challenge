import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'User name',
    minLength: 2,
    maxLength: 50,
  })
  @IsNotEmpty()
  @Length(2, 50)
  name: string;

  @ApiProperty({
    example: 'johndoe',
    description: 'User username',
    minLength: 2,
    maxLength: 50,
  })
  @IsNotEmpty()
  @Length(2, 50)
  username: string;

  @ApiProperty({
    example: 'johndoe@ex.com',
    description: 'User email',
    minLength: 3,
    maxLength: 50,
  })
  @IsNotEmpty()
  @Length(3, 50)
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'strongPassword',
    description: 'User password',
    minLength: 6,
    maxLength: 50,
  })
  @IsNotEmpty()
  @Length(6, 50)
  password: string;
}
