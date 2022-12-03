import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { config } from '../config/config';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(config.stripeKey, {
      apiVersion: '2022-11-15',
    });
  }
  public async createCustomer(name: string, email: string) {
    return this.stripe.customers.create({
      name,
      email,
    });
  }

  public async charge(
    amount: number,
    paymentMethodId: string,
    customerId: string,
  ) {
    return this.stripe.paymentIntents.create({
      amount,
      customer: customerId,
      payment_method: paymentMethodId,
      currency: config.stripeCurrency,
      confirm: true,
    });
  }
}
