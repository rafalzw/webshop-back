import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from 'src/decorators/user-obj.decorator';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update.dto';
import {
  GetOneUserResponse,
  UpdateUserResponse,
  UserInterface,
  UserRole,
} from 'src/interfaces/user';
import { UserRoleGuard } from '../guards/user-role.guard';
import { Role } from '../decorators/user-role.decorator';

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

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'), UserRoleGuard)
  @Role(UserRole.ADMIN)
  getOne(@Param('id') id: string): Promise<GetOneUserResponse> {
    return this.usersService.getOne(id);
  }
}
