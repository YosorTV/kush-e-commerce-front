'use client';

import { ChangeEvent, FC } from 'react';

interface MaterialPickerProps {
  productId: number;
  material: string;
  onMaterialChange: (
    productId: number,
    event: ChangeEvent<HTMLInputElement>
  ) => void;
}

export const MaterialPicker: FC<MaterialPickerProps> = ({
  productId,
  onMaterialChange,
  material,
}) => {
  return (
    <div className='flex gap-x-6'>
      <input
        type='radio'
        name={`material-${productId}-gold`}
        value='gold'
        className='radio-secondary radio'
        checked={material === 'gold'}
        onChange={(event) => onMaterialChange(productId, event)}
      />

      <input
        type='radio'
        name={`material-${productId}-silver`}
        value='silver'
        className='radio-accent radio'
        checked={material === 'silver'}
        onChange={(event) => onMaterialChange(productId, event)}
      />
    </div>
  );
};
