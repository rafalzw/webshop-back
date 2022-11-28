export interface ProductInterface {
  id?: string;
  title: string;
  desc: string;
  img: string;
  categories: string[];
  size: string;
  color: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}
