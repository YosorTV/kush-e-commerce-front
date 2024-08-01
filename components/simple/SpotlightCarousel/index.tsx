import { FC } from 'react';

import { Product } from '@/types/components';

import { CategoryCard } from '@/components/elements';
import Carousel from '@/components/elements/Carousel';

type PropType = {
  data: Product[];
  title: string;
};

export const SpotlightCarousel: FC<PropType> = ({ data = [], title }) => {
  const renderSpotlightCard = (product: Product) => {
    return <CategoryCard data={product} key={product.id} />;
  };

  return (
    <Carousel
      title={title}
      options={{ loop: true }}
      autoScroll={data.length >= 4}
      className='px-3 lg:px-6'
    >
      {data.map(renderSpotlightCard)}
    </Carousel>
  );
};
