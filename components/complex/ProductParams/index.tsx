'use client';

import { AddCart } from '@/components/simple/AddButton';
import { ColorOptions } from '@/components/simple/ColorOptions';
import { MaterialOptions } from '@/components/simple/MaterialOptions';
import { SizeOptions } from '@/components/simple/SizeOptions';
import { useCart } from '@/store';
import { usePathname } from '@/lib/navigation';
import { useEffect } from 'react';
import { useTranslations } from 'use-intl';

export const ProductParams = ({
  sizes = [],
  colors = [],
  materials = [],
  availableSizes = [],
  cartData,
}: any) => {
  const state = useCart();
  const t = useTranslations();
  const pathname = usePathname();

  useEffect(() => {
    return () => {
      state.onReset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <section className='flex flex-col gap-y-6'>
      {materials && (
        <MaterialOptions data={materials} title={t('material.title')} />
      )}
      {colors && <ColorOptions data={colors} title={t('color.title')} />}
      {sizes && (
        <SizeOptions
          data={sizes}
          sizes={availableSizes}
          title={t('size.title')}
        />
      )}
      <AddCart data={cartData} />
    </section>
  );
};
