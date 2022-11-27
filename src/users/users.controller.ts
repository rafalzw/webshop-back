import {
  Body,
  Controller,
  Delete,
  Inject,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from 'src/decorators/user-obj.decorator';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update.dto';
import { UpdateUserResponse, UserInterface } from 'src/interfaces/user';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
  ) {}

  @Put('/')
  @UseGuards(AuthGuard('jwt'))
  update(
    @UserObj() user: UserInterface,
    @Body() data: UpdateUserDto,
  ): Promise<UpdateUserResponse> {
    return this.usersService.update(user, data);
  }

  @Delete('/')
  @UseGuards(AuthGuard('jwt'))
  delete(@UserObj() user: UserInterface) {
    return this.usersService.delete(user.id);
  }
}
