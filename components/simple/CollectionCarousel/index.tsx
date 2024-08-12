import { FC } from 'react';

import { CollectionCard } from '../CollectionCard';
import Carousel from '@/components/elements/Carousel';
import { cn } from '@/lib';

type PropType = {
  data: any[];
  title?: string;
  slideClass?: string;
  className?: string;
  fill?: string;
  titleClass?: string;
  format: 'standart' | 'mini';
};

export const CollectionCarousel: FC<PropType> = ({
  data,
  title,
  titleClass,
  className = 'w-full',
  slideClass = 'h-full md:h-96',
  fill = 'fill-white',
  format = 'standart',
}) => {
  const printCollectionCard = ({ cover, slug, title, hintText }: any) => {
    return (
      <CollectionCard
        key={slug}
        img={cover}
        slug={slug}
        title={title}
        hintText={hintText}
        className={slideClass}
        textClassName='text-base-200'
      />
    );
  };

  return (
    <Carousel
      format={format}
      title={title}
      className={className}
      options={{ loop: true }}
      titleClass={cn('text-base-200', titleClass)}
      fill={fill}
    >
      {data.map(printCollectionCard)}
    </Carousel>
  );
};
