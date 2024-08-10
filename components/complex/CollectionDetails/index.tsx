import { FC } from 'react';
import { type BlocksContent } from '@strapi/blocks-react-renderer';

import { ProductCard, StrapiContentBlock, StrapiImage } from '@/components/simple';
import { Title } from '@/components/elements';

import { IImageFormats } from '@/types/components';

interface ICollectionDetails {
  title?: string;
  content?: BlocksContent;
  products?: any[];
  cover: {
    formats: IImageFormats;
    url: string;
    alternativeText?: string;
  };
}

export const CollectionDetails: FC<ICollectionDetails> = ({ content, title, cover, products }) => {
  const printProduct = (product: any) => <ProductCard product={product} key={product.id} />;

  return (
    <article className='flex flex-col'>
      <div className='h-sm relative md:h-md'>
        <Title level='1' variant='heading' className='absolute-center z-10 text-base-300'>
          {title}
        </Title>
        <StrapiImage
          fill
          overlay
          priority
          formats={cover.formats}
          src={cover.url}
          alt={cover?.alternativeText}
          className='absolute aspect-auto h-full w-full object-cover'
        />
      </div>
      <div className='flex flex-col gap-5 p-6'>
        {content && (
          <section className='flex flex-1 flex-col gap-5'>
            <StrapiContentBlock content={content} />
          </section>
        )}
        {products.length > 0 && (
          <section className='grid h-min w-full grid-cols-fluid gap-5'>{products.map(printProduct)}</section>
        )}
      </div>
    </article>
  );
};
