export type Products = {
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
  products: Products[];
  amount: number;
  address: Address;
}
