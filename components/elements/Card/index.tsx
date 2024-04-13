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
          height={600}
          width={600}
          className='h-80 w-full'
        />
      </figure>
      <div className='card-body'>
        <Title level='2' className='card-title'>
          {data?.title}
          <div className='badge badge-secondary'>NEW</div>
        </Title>
        <p>{data?.description}</p>
        <div className='card-actions justify-end'>
          <div className='badge badge-outline'>Fashion</div>
          <div className='badge badge-outline'>Products</div>
          <span>{data?.price}</span>
        </div>
      </div>
    </div>
  );
};
