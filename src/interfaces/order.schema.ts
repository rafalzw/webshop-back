import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

type Products = {
  productId: string;
  quantity: number;
};

type Address = {
  street: string;
  postCode: number;
  city: string;
  country: string;
};

enum Status {
  PENDING = 'pending',
  RECEIVED = 'received',
}

@Schema()
export class Order extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop()
  products: Products[];

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  address: Address;

  @Prop({ required: true, default: 'pending' })
  status: Status;

  @Prop()
  createdAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
