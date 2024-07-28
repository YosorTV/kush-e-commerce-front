import { CollectionCarousel } from '@/components/simple';
import { FC } from 'react';

interface ICollectionSection {
  data: {
    title?: string;
    id: number | string;
    collections: {
      data: any[];
    };
  };
}

export const CollectionSection: FC<ICollectionSection> = ({ data }) => {
  const { id, title, collections } = data;

  return (
    <section
      key={id}
      className='relative flex flex-col bg-neutral p-2.5 !pt-0 hover:cursor-grab active:cursor-grabbing lg:p-5'
    >
      <CollectionCarousel
        mini={false}
        title={title}
        data={collections.data}
        options={{ loop: true }}
      />
    </section>
  );
};
