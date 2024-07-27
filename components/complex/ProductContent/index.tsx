import React from 'react';
import { StrapiImage } from '@/components/simple';
// import { getSrcSet } from '@/helpers/formatters';
import { IImageProps } from '@/types/components';

export const ProductContent = ({ images }: { images: IImageProps[] }) => {
  const printImage = (image: any) => {
    return (
      <li key={image.id} className='h-96 w-96 overflow-hidden'>
        <StrapiImage
          formats={image.formats}
          priority
          alt={image.alternativeText}
          src={image.url}
          height={image.height}
          width={image.width}
          className='h-full w-full object-cover'
        />
      </li>
    );
  };

  return (
    <ul className='grid grid-cols-1 gap-3 lg:grid-cols-2'>
      {images?.map(printImage)}
    </ul>
  );
};
