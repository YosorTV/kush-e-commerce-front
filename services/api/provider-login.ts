import { generateStrapiQuery } from '@/lib';
import { getStrapiData, postStrapiData, putStrapiData } from '../strapi';
import { stripeApi } from '@/lib/stripe';

export const strapiProviderLogin = async ({ provider, options }: any) => {
  const { access_token, email, name } = options;

  const response = await getStrapiData(`auth/${provider}/callback`, generateStrapiQuery({ access_token }));

  if (response.status === 400) {
    const user = await postStrapiData('find-user', { email });

    return user;
  }

  if (response?.user && !response.user.stripeCustomerId) {
    const { stripe } = stripeApi();

    const stripeCustomer = await stripe.customers.create({ email, name });

    if (stripeCustomer.id) {
      await putStrapiData(
        `users/${response.user.id}`,
        { stripeCustomerId: stripeCustomer.id, username: name },
        {
          token: response.jwt
        }
      );
    }
  }

  return response;
};
