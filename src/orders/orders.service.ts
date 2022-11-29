import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from 'src/interfaces/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,
  ) {}

  async create(id: string, body: CreateOrderDto): Promise<Order> {
    const { products, amount, address } = body;
    const newOrder = await this.orderModel.create({
      userId: id,
      products,
      amount,
      address,
    });
    return newOrder;
  }
}
