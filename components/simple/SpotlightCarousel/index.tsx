import { FC } from 'react';

import { Product } from '@/types/components';

import { CategoryCard } from '@/components/elements';
import Carousel from '@/components/elements/Carousel';

type PropType = {
  data: Product[];
  title: string;
};

export const SpotlightCarousel: FC<PropType> = ({ data = [], title }) => {
  const printSpotlightCard = (product: Product) => {
    return <CategoryCard data={product} key={product.id} />;
  };

  return (
    <Carousel
      title={title}
      options={{ loop: true }}
      titleClass='py-3 xs:py-6 text-white'
      className='px-3 pb-10 lg:px-6'
    >
      {data.map(printSpotlightCard)}
    </Carousel>
  );
};
