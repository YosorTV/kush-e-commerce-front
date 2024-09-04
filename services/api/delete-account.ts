import { deleteStrapiData } from '../strapi';
import { logout } from '../actions';

interface IDeleteProfile {
  token: string;
  userId: string;
}

export const deleteProfile = async ({ userId, token }: IDeleteProfile): Promise<any> => {
  const response = await deleteStrapiData(`users/${userId}`, { token });

  if (!response.error) {
    await logout();
  }

  return response;
};
