import { cormorant } from '@/assets/fonts';

import { NextLink, Title } from '@/components/elements';
import { StrapiImage } from '@/components/simple';
import { cn } from '@/lib';
import { FC } from 'react';

export const HeroSection: FC<any> = ({ data }) => {
  return (
    <section className='relative flex min-h-full flex-col py-20'>
      <div className='relative flex justify-center'>
        <Title level='1' className={cn('hero-title', cormorant.className)}>
          {data?.title}
        </Title>
      </div>
      <figure className='relative flex h-full w-full flex-col-reverse text-center text-white'>
        <StrapiImage
          height={3000}
          width={3000}
          className='hero-image'
          src={data?.image?.url}
          alt={data?.image?.alternativeText}
          priority
        />
        <NextLink
          href={`${data.link.url}?page=1&per_page=5`}
          className='absolute-x-center link-hover link bottom-32 z-10 underline-offset-8'
        >
          {data?.link?.text}
        </NextLink>
      </figure>
    </section>
  );
};
