import {
  Address,
  OrderInterface,
  OrderedProducts,
} from '../../interfaces/order';

export class CreateOrderDto implements OrderInterface {
  address: Address;
  amount: number;
  products: OrderedProducts[];
  userId?: string;
}
