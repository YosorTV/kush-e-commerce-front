'use client';

import { FC } from 'react';

import { Product } from '@/types/components';

import { CategoryCard } from '@/components/elements';
import Carousel from '@/components/elements/Carousel';
import { cn } from '@/lib';
import { useScreen } from '@/lib/hooks';

type PropType = {
  data: Product[];
  title: string;
};

export const SpotlightCarousel: FC<PropType> = ({ data = [], title }) => {
  const { md, sm } = useScreen();
  const printSpotlightCard = (product: Product) => {
    return <CategoryCard data={product} key={product.id} />;
  };

  const slidesAmount = () => {
    if (md) return data.length >= 4 ? 'slides-4' : 'slides-2';

    if (sm) {
      return data.length >= 2 ? 'slides-2' : 'slides-1';
    }

    return 'slides-1';
  };

  return (
    <Carousel
      title={title}
      options={{ loop: true }}
      autoScroll={data.length >= 4}
      className={cn('px-3 pb-10 lg:px-6', slidesAmount())}
    >
      {data.map(printSpotlightCard)}
    </Carousel>
  );
};
