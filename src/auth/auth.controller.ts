import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { RegisterDto } from './dto/auth-register.dto';
import { RegisterUserResponse } from '../interfaces/user';
import { AuthLoginDto } from './dto/auth-login.dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() user: RegisterDto): Promise<RegisterUserResponse> {
    return this.authService.register(user);
  }

  @Post('/login')
  async login(@Body() req: AuthLoginDto, @Res() res: Response): Promise<any> {
    return this.authService.login(req, res);
  }
}
