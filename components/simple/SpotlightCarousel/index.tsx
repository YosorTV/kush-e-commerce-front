import { FC } from 'react';

import { Product } from '@/types/components';

import { CategoryCard } from '@/components/elements';
import Carousel from '@/components/elements/Carousel';
import { cn } from '@/lib';

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
      autoScroll={data.length >= 4}
      className={cn(
        'px-3 pb-10 lg:px-6',
        data.length >= 4 ? 'slides-4' : `slides-${data.length}`
      )}
    >
      {data.map(printSpotlightCard)}
    </Carousel>
  );
};
