import { getStrapiData } from '../strapi';

type TGetNovapostWarehouses = {
  search?: string;
  page?: string;
  limit?: string;
  cityId?: string;
};

export const getNovapostWarehouses = async (params: TGetNovapostWarehouses) => {
  const { cityId, search = '', limit = '50', page = '1' } = params;

  const response = await getStrapiData(`/novapost/warehouses/${cityId}?search=${search}&limit=${limit}&page=${page}`);

  const warehousesDataAdapter = ({ data }: any) => {
    if (!data) return [];

    return data.map((warehouse: any) => {
      return {
        label: `${warehouse.Description}, ${warehouse.RegionCity}`,
        value: `${warehouse.CityRef}`
      };
    });
  };

  return warehousesDataAdapter({ data: response });
};
