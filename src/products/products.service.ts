import { Injectable } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../interfaces/product.schema';
import {
  AddProductResponse,
  DeleteProductResponse,
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
  ): Promise<DeleteProductResponse> {
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

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id);
    return product;
  }

  async findAll(newest: string, category: string): Promise<Product[]> {
    let products;
    if (newest) {
      products = await this.productModel
        .find()
        .sort({ createdAt: -1 })
        .limit(5);
    } else if (category) {
      products = await this.productModel.find({
        categories: {
          $in: [category],
        },
      });
    } else {
      products = await this.productModel.find();
    }

    return products;
  }
}
