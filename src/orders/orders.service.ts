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

  async update(id: string, body: CreateOrderDto): Promise<Order> {
    const { products, amount, address } = body;
    const updatedOrder = await this.orderModel.findByIdAndUpdate(
      id,
      {
        products,
        amount,
        address,
      },
      {
        new: true,
      },
    );
    return updatedOrder;
  }

  async remove(id: string): Promise<Order> {
    return await this.orderModel.findByIdAndDelete(id);
  }

  async getUserOrders(id: string): Promise<Order[]> {
    const orders = await this.orderModel.find({ userId: id });
    return orders;
  }

  async getAllOrders(): Promise<Order[]> {
    const orders = await this.orderModel.find();
    return orders;
  }
}
