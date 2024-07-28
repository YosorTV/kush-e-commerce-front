import { FC } from 'react';

import { SpotlightCarousel } from '@/components/simple';

export const SpotlightSection: FC<any> = ({ data }) => {
  return (
    <section className='relative flex h-[646px] flex-col bg-neutral lg:h-[840px]'>
      {data?.products?.data?.length > 0 && (
        <SpotlightCarousel
          title={data.title}
          data={data.products.data}
          options={{ loop: true }}
        />
      )}
    </section>
  );
};
