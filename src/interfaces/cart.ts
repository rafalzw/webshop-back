export type Products = {
  productId: string;
  quantity: number;
};

export interface CartInterface {
  userId: string;
  products: Products[];
}
