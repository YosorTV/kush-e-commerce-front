import { StrapiImage } from '@/components/simple';
import { FC } from 'react';
import { Title } from '../Title';
import { NextLink } from '../Link';

export const Card: FC<any> = ({ data }) => {
  return (
    <div className='card mx-2.5 w-full max-w-96 bg-base-200 shadow-xl'>
      <NextLink href={`/products/${data.id}`} className='p-5'>
        <StrapiImage
          src={data?.cover?.url}
          alt={data?.cover?.alternativeText}
          height={1200}
          width={1200}
          className='h-80 w-full rounded-2xl object-cover'
        />
      </NextLink>
      <div className='card-body p-5 pt-0'>
        <Title level='2' className='card-title text-base-100'>
          {data?.title}
        </Title>
        <p className='text-base-100'>{data?.description}</p>
        <span className='text-base-100'>${data?.price}</span>
      </div>
    </div>
  );
};
