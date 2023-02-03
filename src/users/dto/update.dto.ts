import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 35)
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 20)
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @Length(3, 255)
  email: string;

  @MaxLength(255, {
    message: 'Password is too long',
  })
  @MinLength(5, {
    message: 'Password is too short. Min. 5 characters',
  })
  @IsNotEmpty()
  password: string;
}
