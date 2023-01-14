import {
  Address,
  OrderInterface,
  OrderedProducts,
} from '../../interfaces/order';

export class UpdateOrderDto implements OrderInterface {
  address: Address;
  amount: number;
  products: OrderedProducts[];
  userId?: string;
}
