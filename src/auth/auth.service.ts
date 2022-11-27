import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Response } from 'express';
import { User, UserDocument } from 'src/interfaces/user.schema';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/auth-register.dto';
import { RegisterUserResponse, UserInterface } from '../interfaces/user';
import { AuthLoginDto } from './dto/auth-login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  filter(user): UserInterface {
    const { password, currentTokenId, ...other } = user._doc;
    return other;
  }

  async register(user: RegisterDto): Promise<RegisterUserResponse> {
    const { username, firstName, lastName, email, password } = user;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await this.userModel.create({
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return {
      isSuccess: true,
      data: this.filter(newUser),
    };
  }

  async login(req: AuthLoginDto, res: Response): Promise<any> {
    try {
      const user = await this.userModel.findOne({
        username: req.username,
      });

      if (user && (await bcrypt.compare(req.password, user.password))) {
        return res.json({
          isSuccess: true,
          data: this.filter(user),
        });
      }

      return res.json({ isSuccess: false, error: 'Invalid login data!' });
    } catch (e) {
      return res.json({ error: e.message });
    }
  }
}
