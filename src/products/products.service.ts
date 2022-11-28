import { Injectable } from '@nestjs/common';
import { AddProductDto } from './dto/add-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../interfaces/product.schema';
import { AddProductResponse } from '../interfaces/product';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {}
  async add(product: AddProductDto): Promise<AddProductResponse> {
    return await this.productModel.create(product);
  }
}
