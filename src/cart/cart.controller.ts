import {
  Body,
  Controller,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthGuard } from '@nestjs/passport';
import { UserInterface } from '../interfaces/user';
import { CreateCartDto } from './dto/create-cart.dto';
import { UserObj } from '../decorators/user-obj.decorator';
import { Cart } from '../interfaces/cart.schema';

@Controller('cart')
export class CartController {
  constructor(@Inject(CartService) private readonly cartService: CartService) {}

  @Post('/')
  @UseGuards(AuthGuard('jwt'))
  create(
    @UserObj() user: UserInterface,
    @Body() body: CreateCartDto,
  ): Promise<Cart> {
    return this.cartService.create(user.id, body);
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  update(@Body() body: CreateCartDto, @Param('id') id: string): Promise<Cart> {
    return this.cartService.update(id, body);
  }
}
