import { postStrapiData } from '../strapi';

type TEmailSubscription = {
  email: string;
  locale: string;
};

export async function emailSubscription(props: TEmailSubscription) {
  const data = await postStrapiData('email-subscription', props);

  return data;
}
