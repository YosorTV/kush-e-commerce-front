import { ProductGallery } from '@/components/complex/ProductGallery';
import { ProductParams } from '@/components/complex/ProductParams';
import { NextLink, Title } from '@/components/elements';
import { PageLayout } from '@/components/layouts';
import { Price } from '@/components/simple/Price';
import { StepBack } from '@/components/simple/StepBack';

import {
  getCurrency,
  getProductData,
  getProductMeta,
  getSizesData,
} from '@/services';

import { PageProps } from '@/types/app/page.types';
import { CartItemType } from '@/types/store';
import { Metadata } from 'next';

import { notFound } from 'next/navigation';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale, slug } = props.params;

  const response = await getProductMeta({ locale, slug });

  return response;
}

export default async function ProductDetails({ params }: PageProps) {
  const { locale, slug } = params;

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
      <article
        className='relative flex flex-col-reverse lg:flex-row-reverse'
        role='article'
        aria-labelledby='product-title'
      >
        <div
          className='sticky z-10 flex h-full flex-col gap-3 bg-base-100 p-3 drop-shadow-2xl xs:gap-6 xs:p-6 lg:fixed lg:w-1/2'
          role='complementary'
        >
          <StepBack />
          <header className='flex w-full justify-between' role='product-name'>
            <Title
              level='1'
              id='product-title'
              aria-label='product-title'
              className='text-xl font-semibold leading-10 text-base-200 md:text-3xl lg:text-4xl'
            >
              {data?.title}
            </Title>
            <span className='bg-neutral p-2 text-base-300'>
              {data?.hintText}
            </span>
          </header>
          <div className='flex items-baseline justify-between'>
            <Price
              locale={locale}
              currency={currency}
              price={data?.price}
              sale={data?.saleValue}
            />
            <NextLink
              href={`/catalog?categories=${data?.category}`}
              className='capitalize text-base-200 underline underline-offset-8'
              aria-label={`Category: ${data?.category}`}
            >
              {data?.category}
            </NextLink>
          </div>
          <p>{data?.description}</p>
          <ProductParams
            sizes={allSizes}
            cartData={cartData}
            colors={data.colors.data}
            materials={data.materials.data}
            availableSizes={data.sizes.data}
          />
        </div>
        <ProductGallery
          images={data?.images?.data}
          className='lg:mr-auto lg:w-1/2'
        />
      </article>
    </PageLayout>
  );
}
