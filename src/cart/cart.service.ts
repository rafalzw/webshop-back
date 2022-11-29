import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from '../interfaces/cart.schema';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name)
    private cartModel: Model<CartDocument>,
  ) {}

  async create(id: string, body: CreateCartDto): Promise<Cart> {
    const newCart = await this.cartModel.create({ userId: id, products: body });
    return newCart;
  }

  async update(id: string, body: UpdateCartDto): Promise<Cart> {
    const updatedCart = await this.cartModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return updatedCart;
  }

  async remove(id: string): Promise<Cart> {
    return await this.cartModel.findByIdAndDelete(id);
  }
}
