import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { config } from '../config/config';
import { ProductInterface } from '../interfaces';

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

  async checkout(products: ProductInterface[]) {
    const line_items = products.map((item) => {
      return {
        price_data: {
          currency: 'pln',
          product_data: {
            name: item.title,
            images: [item.img],
            description: item.title,
            metadata: {
              id: item._id,
            },
          },
          unit_amount: item.price * 100,
        },

        quantity: item.quantity,
      };
    });

    const session = await this.stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url:
        'http://localhost:3000/cart?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:3000/cart',
    });

    return { url: session.url };
  }

  async success(sessionId: string) {
    const session = await this.stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items'],
    });
    const line_items = await this.stripe.checkout.sessions.listLineItems(
      sessionId,
      {
        expand: ['data.price.product'],
      },
    );

    return {
      session,
      items: line_items.data,
    };
  }
}
