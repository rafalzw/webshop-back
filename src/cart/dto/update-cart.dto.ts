import { Products } from '../../interfaces/cart';
import { IsArray } from 'class-validator';

export class UpdateCartDto {
  @IsArray()
  products: Products[];
}
