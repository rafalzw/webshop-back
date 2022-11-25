import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/interfaces/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private productModel: Model<User>,
  ) {}
}
