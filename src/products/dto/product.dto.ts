import { ProductInterface } from '../../interfaces/product';

export class ProductDto implements ProductInterface {
  categories: string[];
  color: string;
  desc: string;
  img: string;
  price: number;
  size: string;
  title: string;
}
