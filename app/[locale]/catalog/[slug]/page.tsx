import { CompleteLook } from '@/components/complex/CompleteLook';
import { DeliveryRules } from '@/components/complex/DeliveryRules';
import { ProductGallery } from '@/components/complex/ProductGallery';
import { ProductParams } from '@/components/complex/ProductParams';
import { NextLink, Title } from '@/components/elements';
import { PageLayout } from '@/components/layouts';
import { DeliveryBlock } from '@/components/simple/DeliveryBlock';
import { Price } from '@/components/simple/Price';
import { StepBack } from '@/components/simple/StepBack';

import { getCurrency, getProductData, getProductMeta, getSizesData } from '@/services';

import { PageProps } from '@/types/app/page.types';
import { CartItemType } from '@/types/store';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { notFound } from 'next/navigation';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale, slug } = props.params;

  const response = await getProductMeta({ locale, slug });

  return response;
}

export default async function ProductDetails({ params }: PageProps) {
  const { locale, slug } = params;

  const t = await getTranslations();

  const currency = await getCurrency();
  const { data } = await getProductData({ locale, slug });
  const { data: allSizes } = await getSizesData({ locale });

  if (!data) {
    return notFound();
  }

  const cartData: CartItemType = {
    id: data?.id,
    name: data?.title,
    unit_amount: data?.price,
    quantity: 1,
    description: data?.description,
    images: data?.images?.data?.[0],
  };

  return (
    <PageLayout className='mt-16 min-h-screen'>
      <article className='relative flex flex-col-reverse lg:flex-row-reverse'>
        <section className='z-10 flex h-full w-full flex-col gap-3 bg-base-100 p-3 !pb-0 xs:gap-6 xs:p-6'>
          <header className='flex w-full justify-between' role='product-name'>
            <Title
              level='1'
              id='product-title'
              aria-label='product-title'
              className='text-xl font-semibold leading-10 text-base-200 md:text-3xl lg:text-4xl'
            >
              {data?.title}
            </Title>
            <span className='bg-neutral p-2 text-base-300'>{data?.hintText}</span>
          </header>
          <div className='flex items-baseline justify-between'>
            <Price locale={locale} currency={currency} price={data?.price} sale={data?.saleValue} />
            <NextLink
              href={`/catalog?categories=${data?.category}`}
              className='capitalize text-base-200 underline underline-offset-8'
              aria-label={`Category: ${data?.category}`}
            >
              {t(`category.${data?.category}`)}
            </NextLink>
          </div>
          <p className='whitespace-pre-line text-pretty'>{data?.description}</p>
          <ProductParams
            sizes={allSizes}
            cartData={cartData}
            colors={data.colors.data}
            materials={data.materials.data}
            availableSizes={data.sizes.data}
          />
          <DeliveryBlock locale={locale} />
        </section>
        <div className='relative w-full'>
          <StepBack className='absolute left-6 lg:relative' />
          <ProductGallery images={data?.images?.data.slice(0, 4)} className='w-full' />
        </div>
      </article>
      <DeliveryRules locale={locale} />
      <CompleteLook locale={locale} currency={currency} category={data.category} />
    </PageLayout>
  );
}
