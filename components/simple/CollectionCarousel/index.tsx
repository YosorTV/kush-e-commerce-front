import { FC } from 'react';

import { CollectionCard } from '../CollectionCard';
import Carousel from '@/components/elements/Carousel';

type PropType = {
  data: any[];
  title?: string;
  slideClass?: string;
  className?: string;
};

export const CollectionCarousel: FC<PropType> = ({
  data,
  title,
  className = 'slides-2 w-full',
  slideClass = 'h-[420px]',
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
      options={{ slidesToScroll: 'auto', loop: true }}
    >
      {data.map(printCollectionCard)}
    </Carousel>
  );
};
