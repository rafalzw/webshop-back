import { Body, Controller, Inject, Put, UseGuards } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from '../decorators/user-obj.decorator';
import { UserInterface } from '../interfaces/user';
import { CreateChargeDto } from './dto/create-charge.dto';

@Controller('stripe')
export class StripeController {
  constructor(
    @Inject(StripeService) private readonly stripeService: StripeService,
  ) {}

  @Put('/payment')
  @UseGuards(AuthGuard('jwt'))
  update(@UserObj() user: UserInterface, @Body() charge: CreateChargeDto) {
    return this.stripeService.charge(
      charge.amount,
      charge.paymentMethodId,
      user.stripeCustomerId,
    );
  }
}
