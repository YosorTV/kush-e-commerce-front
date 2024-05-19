import Stripe from 'stripe';

export const stripeApi = () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

  return { stripe };
};
