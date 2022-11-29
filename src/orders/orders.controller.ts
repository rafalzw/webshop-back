import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from '../decorators/user-obj.decorator';
import { UserInterface, UserRole } from '../interfaces/user';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from 'src/interfaces/order.schema';
import { UserRoleGuard } from '../guards/user-role.guard';
import { Role } from '../decorators/user-role.decorator';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(OrdersService) private readonly ordersService: OrdersService,
  ) {}

  @Post('/')
  @UseGuards(AuthGuard('jwt'))
  create(
    @UserObj() user: UserInterface,
    @Body() body: CreateOrderDto,
  ): Promise<Order> {
    return this.ordersService.create(user.id, body);
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'), UserRoleGuard)
  @Role(UserRole.ADMIN)
  update(
    @Param('id') id: string,
    @Body() body: UpdateOrderDto,
  ): Promise<Order> {
    return this.ordersService.update(id, body);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'), UserRoleGuard)
  @Role(UserRole.ADMIN)
  remove(@Param('id') id: string): Promise<Order> {
    return this.ordersService.remove(id);
  }

  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  getUserOrders(@UserObj() user: UserInterface): Promise<Order[]> {
    return this.ordersService.getUserOrders(user.id);
  }
}
