import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../interfaces/user.schema';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update.dto';
import {
  GetAllUsersResponse,
  GetOneUserResponse,
  UpdateUserResponse,
  UserInterface,
} from '../interfaces/user';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  filter(user): UserInterface {
    const { password, currentTokenId, ...other } = user._doc;
    return other;
  }

  async update(
    user: UserInterface,
    data: UpdateUserDto,
  ): Promise<UpdateUserResponse> {
    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.password, salt);
      await this.userModel.findByIdAndUpdate(user.id, {
        ...data,
        password: hashedPassword,
      });
    }

    await this.userModel.findByIdAndUpdate(user.id, {
      ...data,
    });

    return {
      isSuccess: true,
    };
  }

  async delete(id: string) {
    await this.userModel.findByIdAndRemove(id);
    return {
      isSuccess: true,
    };
  }

  async getOne(id: string): Promise<GetOneUserResponse> {
    const user = await this.userModel.findById(id);
    return this.filter(user);
  }

  async getAll(latest): Promise<GetAllUsersResponse> {
    const users = latest
      ? await this.userModel.find().sort({ _id: -1 }).limit(5)
      : await this.userModel.find();
    return users.map((user) => this.filter(user));
  }
}
