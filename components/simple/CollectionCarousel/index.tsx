import { FC } from 'react';

import { CollectionCard } from '../CollectionCard';
import Carousel from '@/components/elements/Carousel';

type PropType = {
  data: any[];
  title?: string;
  slideClass?: string;
  className?: string;
  fill?: string;
};

export const CollectionCarousel: FC<PropType> = ({
  data,
  title,
  className = 'slides-2 w-full',
  slideClass = 'h-[420px]',
  fill = 'fill-white',
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
      title={title}
      className={className}
      options={{ loop: true }}
      titleClass='py-3 xs:py-6 text-white'
      fill={fill}
    >
      {data.map(printCollectionCard)}
    </Carousel>
  );
};
