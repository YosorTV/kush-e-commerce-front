import { FC } from 'react';

import { Product } from '@/types/components';

import { CategoryCard } from '@/components/elements';
import Carousel from '@/components/elements/Carousel';
import { getCurrency } from '@/services';
import { getLocale } from 'next-intl/server';

type PropType = {
  data: Product[];
  title: string;
};

export const SpotlightCarousel: FC<PropType> = async ({ data = [], title }) => {
  const currency = await getCurrency();
  const locale = await getLocale();

  const printSpotlightCard = (product: Product) => {
    return (
      <CategoryCard
        data={product}
        key={product.id}
        currency={currency}
        locale={locale}
      />
    );
  };

  return (
    <Carousel
      title={title}
      options={{ loop: true }}
      titleClass='py-3 xs:py-6 text-white'
      className='px-3 pb-10 lg:px-6'
      fill='fill-white'
    >
      {data.map(printSpotlightCard)}
    </Carousel>
  );
};
