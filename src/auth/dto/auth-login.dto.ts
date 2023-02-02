import {
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthLoginDto {
  @IsString()
  @IsNotEmpty()
  @Length(4, 20)
  username: string;

  @MaxLength(255, {
    message: 'Password is too long',
  })
  @MinLength(5, {
    message: 'Password is too short. Min. 5 characters',
  })
  @IsNotEmpty()
  password: string;
}
