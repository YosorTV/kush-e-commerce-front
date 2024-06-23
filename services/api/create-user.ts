import { stripeApi } from '@/lib/stripe';
import { postStrapiData } from '../strapi';

interface RegisterUserProps {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
  email: string;
  confirmed: boolean;
}

export async function createUser(user: RegisterUserProps) {
  const { stripe } = stripeApi();

  const customer = await stripe.customers.create({
    email: user.email,
    name: user.username,
  });

  if (customer) {
    const data = await postStrapiData('auth/local/register', {
      ...user,
      stripeCustomerId: customer.id,
    });

    return data;
  }
}
