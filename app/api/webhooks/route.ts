import Stripe from 'stripe';

import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { stripeApi } from '@/lib/stripe';
import { putStrapiData } from '@/services/strapi';

const { stripe } = stripeApi();

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = headers().get('stripe-signature');
  const secret = process.env.STRIPE_WEBHOOK_SECRET!;

  if (!signature || !secret) {
    return NextResponse.json(
      { message: 'Missing the stripe signature' },
      { status: 404 }
    );
  }

  try {
    const event: Stripe.Event = stripe.webhooks.constructEvent(
      body,
      signature,
      secret
    );

    switch (event.type) {
      case 'charge.succeeded':
        const charge = event.data.object as Stripe.Charge;

        const { status, message } = await putStrapiData('order-update', {
          paymentIntentID: charge.payment_intent,
        });

        return NextResponse.json({ message }, { status });

      default:
        return NextResponse.json(
          { message: 'Stripe events', data: event },
          { status: 200 }
        );
    }
  } catch (err) {
    return NextResponse.json(
      { message: 'Webhook error', error: err },
      { status: 400 }
    );
  }
}
