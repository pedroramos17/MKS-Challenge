import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SigninDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'bQpDZ@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'hardToGuess',
  })
  @IsNotEmpty()
  password: string;
}
