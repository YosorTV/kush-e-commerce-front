import { StrapiImage } from '@/components/simple';
import { FC } from 'react';
import { Title } from '../Title';

export const Card: FC<any> = ({ data }) => {
  return (
    <div className='card mx-2.5 w-full max-w-96 bg-neutral shadow-xl'>
      <figure>
        <StrapiImage
          src={data?.cover?.url}
          alt={data?.cover?.alternativeText}
          height={1200}
          width={1200}
          className='h-80 w-full object-cover'
        />
      </figure>
      <div className='card-body'>
        <Title level='2' className='card-title'>
          {data?.title}
        </Title>
        <p>{data?.description}</p>
        <span>${data?.price}</span>
      </div>
    </div>
  );
};
