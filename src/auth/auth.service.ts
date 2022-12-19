import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Response } from 'express';
import { User, UserDocument } from 'src/interfaces/user.schema';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/auth-register.dto';
import { RegisterUserResponse, UserInterface } from '../interfaces/user';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtPayload } from './jwt.strategy';
import { sign } from 'jsonwebtoken';
import { config } from '../config/config';
import { v4 as uuid } from 'uuid';
import { StripeService } from 'src/stripe/stripe.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private stripeService: StripeService,
  ) {}

  filter(user): UserInterface {
    const { password, currentTokenId, ...other } = user._doc;
    return other;
  }

  async register(user: RegisterDto): Promise<RegisterUserResponse> {
    const { username, firstName, lastName, email, password } = user;

    const stripeCustomer = await this.stripeService.createCustomer(
      username,
      email,
    );

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await this.userModel.create({
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      stripeCustomerId: stripeCustomer.id,
    });
    await newUser.save();
    return {
      isSuccess: true,
      data: this.filter(newUser),
    };
  }

  protected createToken(currentTokenId: string): {
    accessToken: string;
    expiresIn: number;
  } {
    const payload: JwtPayload = { id: currentTokenId };
    const expiresIn = 60 * 60 * 24;
    const accessToken = sign(payload, config.jwtSecret, {
      expiresIn,
    });
    return {
      accessToken,
      expiresIn,
    };
  }

  protected async generateToken(user: UserDocument): Promise<string> {
    let token;
    let userWithThisToken = null;
    do {
      token = uuid();
      userWithThisToken = await this.userModel.findOne({
        currentTokenId: token,
      });
    } while (!!userWithThisToken);
    user.currentTokenId = token;
    await user.save();

    return token;
  }

  async login(req: AuthLoginDto, res: Response): Promise<any> {
    try {
      const user = await this.userModel.findOne({
        username: req.username,
      });

      if (user && (await bcrypt.compare(req.password, user.password))) {
        const token = this.createToken(await this.generateToken(user));
        return res
          .status(200)
          .cookie('jwt', token.accessToken, {
            secure: true,
            httpOnly: true,
          })
          .json(this.filter(user));
      }

      return res.status(401).json({ error: 'Invalid login data!' });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  async logout(user: UserDocument, res: Response) {
    try {
      const foundUser = await this.userModel.findOne({ _id: user.id });
      foundUser.currentTokenId = null;
      await foundUser.save();
      res.clearCookie('jwt', {
        secure: true,
        httpOnly: true,
      });
      return res.status(200).json({ isSuccess: true });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
}
