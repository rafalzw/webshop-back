import { Address, OrderInterface, Products } from '../../interfaces/order';

export class AddOrderDto implements OrderInterface {
  address: Address;
  amount: number;
  products: Products[];
  userId: string;
}
