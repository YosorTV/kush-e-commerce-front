import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { getCurrency, getProductData, getProductMeta, getSizesData } from '@/services';

import { PageLayout } from '@/components/layouts';
import { NextLink, Title } from '@/components/elements';
import { Price, Wishlist, AddCart, DeliveryBlock, StepBack } from '@/components/simple';
import { CompleteLook, DeliveryRules, ProductGallery, ProductParams } from '@/components/complex';

import { CartItemType } from '@/types/store';
import { PageProps } from '@/types/app/page.types';
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
  const { data: sizes } = await getSizesData({ locale });

  if (!data) {
    return notFound();
  }

  const cartData: CartItemType = {
    id: data.id,
    quantity: 1,
    name: data.title,
    category: data.category,
    url: `/catalog/${data.slug}`,
    description: data?.description,
    images: data?.images?.data?.[0],
    unit_amount: data.price - data.price * (data.saleValue / 100)
  };

  return (
    <PageLayout className='relative mt-16'>
      <StepBack className='absolute z-10 !mx-5 justify-start lg:relative lg:z-0' />
      <article className='relative flex flex-col-reverse lg:flex-row-reverse'>
        <section className='flex h-full w-svw flex-col gap-2.5 bg-base-100 p-3 !py-0 sm:p-5'>
          <header className='flex w-full flex-wrap justify-between gap-2.5 pt-5 lg:pt-0' role='product-name'>
            {data?.title && (
              <Title
                level='1'
                id='product-title'
                aria-label='product-title'
                className='text-xl font-semibold leading-10 text-base-200 md:text-3xl lg:text-4xl'
              >
                {data?.title}
              </Title>
            )}
            <span className='bg-neutral p-2 text-base-300'>{data?.hintText}</span>
          </header>
          <div className='flex flex-wrap items-baseline justify-between py-2.5'>
            <Price currency={currency} price={data?.price} sale={data?.saleValue} className='flex flex-row' />
            <NextLink
              href={`/catalog?categories=${data?.category}`}
              className='capitalize text-base-200 underline underline-offset-8'
              aria-label={`Category: ${data?.category}`}
            >
              {t(`category.${data?.category}`)}
            </NextLink>
          </div>
          <p className='whitespace-pre-line text-wrap'>{data?.description}</p>
          <ProductParams sizes={sizes} materials={data.materials.data} availableSizes={data.sizes.data}>
            <div className='mt-5 flex flex-col'>
              <Wishlist
                text={t(data?.inWishlist ? 'wishlist.added' : 'wishlist.add')}
                locale={locale}
                productId={data?.id}
                inWishlist={data?.inWishlist}
              />
              <div className='divider' />
              <AddCart data={cartData} isDisabled={data?.available} isSizesNotAvailable={!data.sizes.data.length} />
            </div>
          </ProductParams>
          <DeliveryBlock locale={locale} />
        </section>
        <ProductGallery images={data?.images?.data.slice(0, 4)} />
      </article>
      <DeliveryRules locale={locale} />
      <CompleteLook locale={locale} currency={currency} category={data.category} />
    </PageLayout>
  );
}
