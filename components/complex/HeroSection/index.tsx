import { cormorant } from '@/assets/fonts';

import { NextLink, Title } from '@/components/elements';
import { StrapiImage } from '@/components/simple';
import { cn } from '@/lib';
import { FC } from 'react';

export const HeroSection: FC<any> = ({ data }) => {
  return (
    <section className='relative flex flex-col'>
      <div className='relative flex justify-center'>
        <Title level='1' className={cn('hero-title', cormorant.className)}>
          {data?.title}
        </Title>
      </div>
      <div className='relative flex h-96 w-full flex-col-reverse overflow-hidden text-center text-white md:h-md lg:h-lg'>
        <StrapiImage
          priority
          fill
          className='hero-image'
          formats={data?.image?.formats}
          src={data?.image?.url}
          alt={data?.image?.alternativeText}
        />
        <NextLink
          href={data.link.url}
          className='absolute-x-center link-hover link bottom-10 z-10 underline-offset-8'
        >
          {data?.link?.text}
        </NextLink>
      </div>
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
