import { generateStrapiQuery } from '@/lib';
import { getStrapiData, putStrapiData } from '../strapi';
import { stripeApi } from '@/lib/stripe';

export const strapiProviderLogin = async ({ provider, options }: any) => {
  const { access_token, email, name } = options;

  const response = await getStrapiData(
    `auth/${provider}/callback`,
    generateStrapiQuery({ access_token })
  );

  if (!response.user.stripeCustomerId) {
    const { stripe } = stripeApi();

    const stripeCustomer = await stripe.customers.create({ email, name });

    await putStrapiData(
      `users/${response.user.id}`,
      { stripeCustomerId: stripeCustomer.id, username: name },
      {
        token: response.jwt,
      }
    );
  }

  return response;
};
