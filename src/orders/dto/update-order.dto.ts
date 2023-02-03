import {
  Address,
  OrderInterface,
  OrderedProducts,
} from '../../interfaces/order';
import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateOrderDto implements OrderInterface {
  @IsObject()
  address: Address;
  @IsNumber()
  amount: number;
  @IsArray()
  products: OrderedProducts[];
  @IsOptional()
  @IsString()
  userId?: string;
}
