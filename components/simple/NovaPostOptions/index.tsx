'use client';

import { FC, useCallback, useState } from 'react';

import { AsyncSelect, Input } from '@/components/elements';

import { getNovapostCities } from '@/services/api/get-novapost-cities';
import { getNovapostWarehouses } from '@/services/api/get-novapost-warehouse';

type TOption = {
  label: string;
  value: string;
};

interface INovaPostOptions {
  cityOptions?: TOption;
  warehouseOptions?: TOption;
  disabled?: boolean;
}

export const NovaPostOptions: FC<INovaPostOptions> = ({ cityOptions, warehouseOptions, disabled = false }) => {
  const [city, setCity] = useState<TOption>(cityOptions);
  const [warehouse, setWarehouse] = useState<TOption>(warehouseOptions);

  const handleCityChange = (selectedOption: { label: string; value: string } | null) => {
    if (selectedOption) {
      setCity(selectedOption);
      setWarehouse({ label: '', value: '' });
    } else {
      setCity({ label: '', value: '' });
      setWarehouse({ label: '', value: '' });
    }
  };

  const handleWarehouseChange = (selectedOption: { label: string; value: string } | null) => {
    if (selectedOption) {
      setWarehouse(selectedOption);
    } else {
      setWarehouse({ label: '', value: '' });
    }
  };

  const loadCityOptions = useCallback(async (search: string, loadedOptions: any, { page }: { page: number }) => {
    const result = await getNovapostCities({
      page: String(page),
      search,
      limit: '50'
    });

    return {
      options: result,
      hasMore: result.length === 50,
      additional: { page: page + 1 }
    };
  }, []);

  const loadWarehousesOptions = useCallback(
    async (search: string, loadedOptions: any, { page }: { page: number }) => {
      if (!city.value) return { options: [], hasMore: false, additional: { page: page } };

      const result = await getNovapostWarehouses({
        cityId: city.value,
        page: String(page),
        search,
        limit: '50'
      });

      return {
        options: result,
        hasMore: result.length === 50,
        additional: { page: page + 1 }
      };
    },
    [city.value]
  );

  return (
    <>
      <AsyncSelect
        value={city}
        disabled={disabled}
        placeholder='Search'
        onChange={handleCityChange}
        loadOptions={loadCityOptions}
      />
      {city.value && (
        <AsyncSelect
          disabled={disabled}
          key={city.value}
          value={warehouse}
          onChange={handleWarehouseChange}
          loadOptions={loadWarehousesOptions}
          placeholder='Search'
        />
      )}
      <Input type='hidden' hidden name='city' value={city.label} className='hidden' />
      <Input type='hidden' hidden name='cityID' value={city.value} className='hidden' />
      <Input type='hidden' hidden name='warehouse' value={warehouse.label} className='hidden' />
      <Input type='hidden' hidden name='warehouseID' value={warehouse.value} className='hidden' />
    </>
  );
};
