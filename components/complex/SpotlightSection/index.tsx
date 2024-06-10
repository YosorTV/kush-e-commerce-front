import { FC } from 'react';

import { Carousel } from '@/components/simple';

export const SpotlightSection: FC<any> = ({ data }) => {
  return (
    <section className='relative flex h-[646px] flex-col bg-neutral lg:h-[840px]'>
      <Carousel
        title={data.title}
        data={data.products.data}
        options={{ loop: true }}
      />
    </section>
  );
};
