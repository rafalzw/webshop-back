import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({
  timestamps: true,
})
export class Product extends Document {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true })
  desc: string;

  @Prop({ required: true })
  img: string;

  @Prop({ type: Array })
  categories: string[];

  @Prop({ type: Array })
  size: string[];

  @Prop({ type: Array })
  color: string[];

  @Prop({ required: true })
  price: number;

  @Prop({ type: Boolean, default: true })
  inStock: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
