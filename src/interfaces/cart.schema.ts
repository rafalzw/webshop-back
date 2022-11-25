import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

type Products = {
  productId: string;
  quantity: number;
};

@Schema()
export class Cart extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, unique: true })
  products: Products[];

  @Prop()
  createdAt: Date;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
