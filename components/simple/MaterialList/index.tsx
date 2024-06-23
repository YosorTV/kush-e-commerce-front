import { ChangeEvent } from 'react';
import { useTranslations } from 'next-intl';
import { useFilters } from '@/store';

import { Input } from '@/components/elements';

type TMaterial = {
  id: string;
  text: string;
};

export const MaterialList = () => {
  const t = useTranslations('material');
  const state = useFilters();

  const materials: TMaterial[] = [
    { id: `material-${1}`, text: 'gold' },
    { id: `material-${2}`, text: 'silver' },
    { id: `material-${3}`, text: 'platinum' },
  ];

  const handleMaterialChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = target;
    const { materials } = state.options;

    const newMaterials = checked
      ? [...materials, value]
      : materials.filter((material) => material !== value);

    state.onFilter({ key: 'materials', value: newMaterials });
  };

  const printMaterialList = (el: TMaterial) => (
    <Input
      key={el.id}
      id={el.id}
      name='material'
      label={t(el.text)}
      type='checkbox'
      value={el.text}
      checked={state.options?.materials?.includes(el.text)}
      onChange={handleMaterialChange}
      className='checkbox checked:fill-base-200'
      labelStyle='text-base-200 font-medium text-lg cursor-pointer'
      containerClass='flex-row flex-row-reverse justify-end items-center gap-x-3'
    />
  );

  return <div className='form-control'>{materials.map(printMaterialList)}</div>;
};
