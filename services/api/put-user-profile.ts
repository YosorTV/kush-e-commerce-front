'use server';

import { revalidateTag } from 'next/cache';
import { putStrapiData } from '../strapi';

type putUserData = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  userId: string;
  username: string;
};

export async function putUserData(data: putUserData, token: string) {
  const response = await putStrapiData(`users/${data.userId}`, data, { token });

  revalidateTag('profile');

  return response;
}
