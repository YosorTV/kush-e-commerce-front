import { getStrapiData } from '../strapi';

type TGetNovapostCities = {
  search?: string;
  page?: string;
  limit?: string;
};

export const getNovapostCities = async (params: TGetNovapostCities) => {
  const { page = '1', limit = '200', search = '' } = params;

  const response = await getStrapiData(`novapost/cities?page=${page}&limit=${limit}&search=${search}`);

  const citiesDataAdapter = ({ data }: any) => {
    if (!data) return [];

    return data.map((city: any) => {
      return {
        label: `${city.Description}, ${city.AreaDescription}`,
        value: `${city.Ref}`
      };
    });
  };

  return citiesDataAdapter({ data: response });
};
