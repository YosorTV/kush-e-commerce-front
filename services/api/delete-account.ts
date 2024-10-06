import { deleteStrapiData } from '../strapi';
import { logout } from '../actions';

interface IDeleteProfile {
  token: string;
  userId: string;
  locale: string;
}

export const deleteProfile = async ({ userId, token, locale }: IDeleteProfile): Promise<any> => {
  const response = await deleteStrapiData(`users/${userId}`, { token });

  if (!response.error) {
    await logout({ locale });
  }

  return response;
};
