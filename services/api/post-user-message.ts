import { postStrapiData } from '../strapi';

interface IPostUserMessage {
  name: string;
  email: string;
  message: string;
  locale: string;
}

export async function postUserMessage(data: IPostUserMessage) {
  const response = await postStrapiData('contact-us', data);

  return response;
}
