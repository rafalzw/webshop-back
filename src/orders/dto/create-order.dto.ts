import { Address, OrderInterface, Products } from '../../interfaces/order';

export class CreateOrderDto implements OrderInterface {
  address: Address;
  amount: number;
  products: Products[];
  userId?: string;
}
