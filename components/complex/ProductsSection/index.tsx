import { FC } from 'react';

import { getCatalogData } from '@/services';

import { Title } from '@/components/elements';
import {
  ProductsContent,
  ProductsController,
  StrapiImage,
} from '@/components/simple';

import { cn } from '@/lib';
import { cormorant } from '@/assets/fonts';

export const ProductsSection: FC<{ locale: string }> = async ({ locale }) => {
  const { title, categories, img } = await getCatalogData({ locale });
  console.log('categories: ', categories);

  return (
    <section>
      <div className='h-96 overflow-hidden lg:h-full'>
        <StrapiImage
          width={1000}
          height={1000}
          src={img?.url}
          alt={img?.alternativeText}
          className='hero-image'
          priority
        />
      </div>
      <div className='px-5'>
        <Title
          level='2'
          className={cn(
            'py-5 text-left text-4xl uppercase text-base-200 lg:text-5xl',
            cormorant.className
          )}
        >
          {title}
        </Title>
        <ProductsController categories={categories} />
        <ProductsContent className='pt-6' />
      </div>
    </section>
  );
};
