export type OrderedProducts = {
  productId: string;
  quantity: number;
};

export type Address = {
  street: string;
  postCode: number;
  city: string;
  country: string;
};

export interface OrderInterface {
  userId?: string;
  products: OrderedProducts[];
  amount: number;
  address: Address;
}
