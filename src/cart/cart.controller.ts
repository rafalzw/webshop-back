import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthGuard } from '@nestjs/passport';
import { UserInterface, UserRole } from '../interfaces/user';
import { CreateCartDto } from './dto/create-cart.dto';
import { UserObj } from '../decorators/user-obj.decorator';
import { Cart } from '../interfaces/cart.schema';
import { UpdateCartDto } from './dto/update-cart.dto';
import { UserRoleGuard } from '../guards/user-role.guard';
import { Role } from '../decorators/user-role.decorator';

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
  update(@Body() body: UpdateCartDto, @Param('id') id: string): Promise<Cart> {
    return this.cartService.update(id, body);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string): Promise<Cart> {
    return this.cartService.remove(id);
  }

  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  getCart(@UserObj() user: UserInterface): Promise<Cart> {
    return this.cartService.getCart(user.id);
  }

  @Get('/all')
  @UseGuards(AuthGuard('jwt'), UserRoleGuard)
  @Role(UserRole.ADMIN)
  getAllCarts(): Promise<Cart[]> {
    return this.cartService.getAllCarts();
  }
}
