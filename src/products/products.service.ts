import { Injectable } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../interfaces/product.schema';
import {
  AddProductResponse,
  UpdateProductResponse,
} from '../interfaces/product';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {}
  async add(product: ProductDto): Promise<AddProductResponse> {
    return await this.productModel.create(product);
  }

  async update(
    id: string,
    product: ProductDto,
  ): Promise<UpdateProductResponse> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      product,
      { new: true },
    );
    return updatedProduct;
  }

  async remove(id: string): Promise<UpdateProductResponse> {
    return await this.productModel.findByIdAndDelete(id);
  }
}
