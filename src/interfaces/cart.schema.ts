import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CartInterface, Products } from './cart';

export type CartDocument = HydratedDocument<Cart>;

@Schema({
  timestamps: true,
})
export class Cart implements CartInterface {
  @Prop({ required: true })
  userId: string;

  @Prop()
  products: Products[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
