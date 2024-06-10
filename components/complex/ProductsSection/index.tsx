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
      <div className='h-[200px] md:h-[340px] lg:h-[420px]'>
        <StrapiImage
          width={1920}
          height={1080}
          src={img?.url}
          alt={img?.alternativeText}
          className='h-full w-full object-cover object-center-to-top'
        />
      </div>
      <div className='px-5'>
        <Title
          level='2'
          className={cn(
            'py-5 text-5xl uppercase text-base-200',
            cormorant.className
          )}
        >
          {title}
        </Title>
        <ProductsController tabs={categories} className='flex flex-col' />
        <ProductsContent className='pt-6' />
      </div>
    </section>
  );
};
