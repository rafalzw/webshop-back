import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

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

export type OrderDocument = HydratedDocument<Order>;

@Schema({
  timestamps: true,
})
export class Order {
  @Prop({ required: true })
  userId: string;

  @Prop()
  products: Products[];

  @Prop({ required: true })
  amount: number;

  @Prop({ type: Object, required: true })
  address: Address;

  @Prop({ required: true, default: Status.PENDING })
  status: Status;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
