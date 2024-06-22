import { cormorant } from '@/assets/fonts';
import { Title } from '@/components/elements';
import {
  ProductsContent,
  ProductsController,
  StrapiImage,
} from '@/components/simple';

import { cn } from '@/lib';
import { getCatalogData } from '@/services';

export const ProductsSection = async ({ locale }: { locale: string }) => {
  const { title, categories, img } = await getCatalogData({ locale });

  return (
    <section>
      <div className='h-60 overflow-hidden lg:h-lg'>
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
        <ProductsController
          tabs={categories}
          className='flex w-full items-center justify-between gap-x-6'
        />
        <ProductsContent className='pt-6' />
      </div>
    </section>
  );
};
