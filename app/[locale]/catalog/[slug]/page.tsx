import { ProductGallery } from '@/components/complex/ProductGallery';
import { NextLink, Title } from '@/components/elements';
import { PageLayout } from '@/components/layouts';
import { AddCart } from '@/components/simple/AddButton';
import { ColorOptions } from '@/components/simple/ColorOptions';
import { MaterialOptions } from '@/components/simple/MaterialOptions';
import { Price } from '@/components/simple/Price';
import { SizeOptions } from '@/components/simple/SizeOptions';
import { getCurrency, getProductData, getSizetData } from '@/services';

import { PageProps } from '@/types/app/page.types';
import { CartItemType } from '@/types/store';
import { notFound } from 'next/navigation';

export default async function ProductDetails({ params }: PageProps) {
  const { locale, slug } = params;

  const currency = await getCurrency();
  const { data } = await getProductData({ locale, slug });
  const { data: allSizes } = await getSizetData({ locale });

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
        <div className='sticky z-10 flex h-full flex-col gap-6 bg-base-100 p-6 drop-shadow-2xl lg:fixed lg:w-1/2'>
          <section className='flex w-full justify-between'>
            <Title
              level='1'
              className='text-2xl font-semibold leading-10 text-base-200 md:text-3xl lg:text-4xl'
            >
              {data?.title}
            </Title>
            <span className='bg-neutral p-2 text-base-300'>
              {data?.hintText}
            </span>
          </section>
          <section className='flex items-baseline justify-between'>
            <Price
              locale={locale}
              currency={currency}
              price={data?.price}
              sale={data?.saleValue}
            />
            <NextLink
              href={`/catalog?categories=${data?.category}`}
              className='capitalize text-base-200 underline underline-offset-8'
            >
              {data?.category}
            </NextLink>
          </section>
          <p>{data?.description}</p>
          {data?.colors?.data && (
            <section className='flex gap-x-3'>
              <ColorOptions data={data.colors.data} title='Colors' />
            </section>
          )}
          {data?.materials?.data && (
            <section className='flex gap-x-3'>
              <MaterialOptions data={data.materials.data} title='Materials' />
            </section>
          )}
          {data?.sizes?.data && (
            <section className='flex gap-x-3'>
              <SizeOptions data={allSizes} sizes={data.sizes.data} />
            </section>
          )}
          <AddCart data={cartData} text='Add to cart' />
        </div>
        <ProductGallery
          images={data?.images?.data}
          className='lg:mr-auto lg:w-1/2'
        />
      </article>
    </PageLayout>
  );
}
