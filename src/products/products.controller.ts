import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/user-role.guard';
import { Role } from '../decorators/user-role.decorator';
import { UserRole } from '../interfaces/user';
import { ProductDto } from './dto/product.dto';
import {
  AddProductResponse,
  DeleteProductResponse,
  UpdateProductResponse,
} from '../interfaces/product';
import { Product } from '../interfaces/product.schema';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(ProductsService) private readonly productsService: ProductsService,
  ) {}

  @Post('/')
  @UseGuards(AuthGuard('jwt'), UserRoleGuard)
  @Role(UserRole.ADMIN)
  add(@Body() product: ProductDto): Promise<AddProductResponse> {
    return this.productsService.add(product);
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'), UserRoleGuard)
  @Role(UserRole.ADMIN)
  update(
    @Param('id') id: string,
    @Body() product: ProductDto,
  ): Promise<UpdateProductResponse> {
    return this.productsService.update(id, product);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'), UserRoleGuard)
  @Role(UserRole.ADMIN)
  remove(@Param('id') id: string): Promise<DeleteProductResponse> {
    return this.productsService.remove(id);
  }

  @Get('/:id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Get('/')
  findAll(
    @Query('newest') newest: string,
    @Query('category') category: string,
  ): Promise<Product[]> {
    return this.productsService.findAll(newest, category);
  }
}
