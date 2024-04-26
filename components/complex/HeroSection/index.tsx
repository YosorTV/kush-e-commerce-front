import { NextLink, Title } from '@/components/elements';
import { StrapiImage } from '@/components/simple';
import { FC } from 'react';

export const HeroSection: FC<any> = ({ data }) => {
  return (
    <section className='hero relative min-h-full'>
      <figure className='hero-content text-center text-white'>
        <StrapiImage
          height={3000}
          width={3000}
          className='absolute -z-10 h-full w-full object-cover'
          src={data?.image?.url}
          alt={data?.image?.alternativeText}
          priority
        />
        <div className='hero-overlay absolute z-10 bg-black/50' />
        <figcaption className='relative z-20 flex max-w-md flex-col gap-y-5'>
          <Title level='1' className='text-5xl font-bold'>
            {data?.title}
          </Title>
          <p className='text-xl font-medium'>{data?.description}</p>
          <NextLink
            href='/products?page=1&per_page=5'
            className='btn btn-ghost z-50'
          >
            {data?.link?.text}
          </NextLink>
        </figcaption>
      </figure>
    </section>
  );
};
