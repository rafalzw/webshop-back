import { IsArray, IsString } from 'class-validator';
import { CartInterface, Products } from '../../interfaces/cart';

export class CreateCartDto implements CartInterface {
  @IsString()
  userId: string;
  @IsArray()
  products: Products[];
}
