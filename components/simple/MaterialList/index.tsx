import { ChangeEvent } from 'react';
import { useTranslations } from 'next-intl';
import { useFilters } from '@/store';

import { Input } from '@/components/elements';

type TMaterial = {
  id: number;
  text: string;
};

export const MaterialList = () => {
  const t = useTranslations('material');
  const state = useFilters();

  const materials: TMaterial[] = [
    { id: 1, text: 'gold' },
    { id: 2, text: 'silver' },
    { id: 3, text: 'platinum' },
  ];

  const handleMaterialChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target;
    const newMaterials = checked
      ? [...state.options.materials, value]
      : state.options.materials.filter((material) => material !== value);

    state.onFilter({ key: 'materials', value: newMaterials });
  };

  const printMaterialList = (el: TMaterial) => (
    <Input
      key={el.id}
      label={t(el.text)}
      type='checkbox'
      value={el.text}
      checked={state.options?.materials?.includes(el.text)}
      onChange={handleMaterialChange}
      className='checkbox checked:fill-base-200'
      labelStyle='text-base-200 font-medium text-lg'
      containerClass='flex-row flex-row-reverse justify-end items-center gap-x-3'
    />
  );

  return <div className='form-control'>{materials.map(printMaterialList)}</div>;
};
