import { cormorant } from '@/assets/fonts';

import { NextLink, Title } from '@/components/elements';
import { StrapiImage } from '@/components/simple';
import { cn } from '@/lib';
import { FC } from 'react';

export const HeroSection: FC<any> = ({ data }) => {
  return (
    <section className='relative flex flex-col pt-20'>
      <div className='relative flex justify-center'>
        <Title level='1' className={cn('hero-title', cormorant.className)}>
          {data?.title}
        </Title>
      </div>
      <figure className='relative flex h-96 w-full flex-col-reverse overflow-hidden text-center text-white lg:h-full'>
        <StrapiImage
          height={2000}
          width={2000}
          className='hero-image'
          src={data?.image?.url}
          alt={data?.image?.alternativeText}
          priority
        />
        <NextLink
          href={data.link.url}
          className='absolute-x-center link-hover link bottom-10 z-10 underline-offset-8'
        >
          {data?.link?.text}
        </NextLink>
      </figure>
      <div className='relative py-10 text-center leading-tight'>
        <Title
          level='3'
          className={cn('hero-sub_title uppercase ', cormorant.className)}
        >
          {data.description}
        </Title>
      </div>
    </section>
  );
};
