import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/user-role.guard';
import { Role } from '../decorators/user-role.decorator';
import { UserRole } from '../interfaces/user';
import { AddProductDto } from './dto/add-product.dto';
import { AddProductResponse } from '../interfaces/product';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(ProductsService) private readonly productsService: ProductsService,
  ) {}

  @Post('/')
  @UseGuards(AuthGuard('jwt'), UserRoleGuard)
  @Role(UserRole.ADMIN)
  add(@Body() product: AddProductDto): Promise<AddProductResponse> {
    return this.productsService.add(product);
  }
}
