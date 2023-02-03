import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { ProductInterface } from '../interfaces';

@Controller('stripe')
export class StripeController {
  constructor(
    @Inject(StripeService) private readonly stripeService: StripeService,
  ) {}

  @Post('/checkout')
  checkout(@Body() products: ProductInterface[]) {
    return this.stripeService.checkout(products);
  }

  @Get('/success')
  success(@Query('session_id') sessionId: string) {
    return this.stripeService.success(sessionId);
  }
}
