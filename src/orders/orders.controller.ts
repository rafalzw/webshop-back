import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from '../decorators/user-obj.decorator';
import { UserInterface } from '../interfaces/user';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from 'src/interfaces/order.schema';

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
}
