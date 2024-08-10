import { FC } from 'react';
import { StrapiImage } from '@/components/simple';
import { NextLink, Title } from '@/components/elements';

export const HeroSection: FC<any> = ({ data }) => {
  return (
    <section className='relative flex flex-col'>
      <div className='relative flex justify-center py-5'>
        <Title level='1' variant='heading'>
          {data?.title}
        </Title>
      </div>
      <div className='relative flex h-96 w-full flex-col-reverse overflow-hidden text-center text-white md:h-md lg:h-2md'>
        <StrapiImage
          fill
          priority
          className='hero-image'
          formats={data?.image?.formats}
          src={data?.image?.url}
          alt={data?.image?.alternativeText}
        />
        <NextLink href={data.link.url} className='absolute-x-center link-hover link bottom-10 z-10 underline-offset-8'>
          {data?.link?.text}
        </NextLink>
      </div>
      <div className='relative px-2.5 py-5  text-center leading-tight md:py-10'>
        <Title level='3' variant='subheading'>
          {data.description}
        </Title>
      </div>
    </section>
  );
};
