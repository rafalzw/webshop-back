import { CartInterface, Products } from '../../interfaces/cart';

export class CreateCartDto implements CartInterface {
  userId: string;
  products: Products[];
}
