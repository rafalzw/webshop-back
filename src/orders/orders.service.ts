import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import { Order, OrderDocument } from 'src/interfaces/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UserInterface } from '../interfaces';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,
  ) {}

  async create(body: CreateOrderDto, user: UserInterface): Promise<Order> {
    const { products, amount, address } = body;
    const newOrder = await this.orderModel.create({
      userId: user._id,
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

  async getStats(): Promise<PipelineStage[]> {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(
      new Date().setMonth(lastMonth.getMonth() - 1),
    );

    const stats = await this.orderModel.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      { $project: { month: { $month: '$createdAt' }, sales: '$amount' } },
      {
        $group: {
          _id: '$month',
          total: { $sum: '$sales' },
        },
      },
    ]);

    return stats;
  }
}
