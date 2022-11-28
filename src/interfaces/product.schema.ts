import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product extends Document {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true, unique: true })
  desc: string;

  @Prop({ required: true })
  img: string;

  @Prop({ type: Array })
  categories: string[];

  @Prop()
  size: string;

  @Prop()
  color: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
