import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { getCurrency, getProductData, getProductMeta, getSizesData } from '@/services';

import { PageLayout } from '@/components/layouts';
import { NextLink, Title } from '@/components/elements';
import { Price, Wishlist, AddCart, DeliveryBlock, StepBack } from '@/components/simple';
import { CompleteLook, DeliveryRules, ProductGallery, ProductParams } from '@/components/complex';

import { CartItemType } from '@/types/store';
import { PageProps } from '@/types/app/page.types';

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
    return null;
  }

  const cartData: CartItemType = {
    id: data.id,
    name: data.title,
    unit_amount: data.price,
    category: data.category,
    quantity: 1,
    description: data?.description,
    images: data?.images?.data?.[0]
  };

  return (
    <PageLayout className='mt-16 min-h-screen'>
      <article className='relative flex flex-col-reverse lg:flex-row-reverse'>
        <section className='z-10 flex h-full w-full flex-col gap-3 bg-base-100 p-3 !pb-0 xs:gap-6 xs:p-6'>
          <header className='flex w-full justify-between' role='product-name'>
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
          <div className='flex items-baseline justify-between'>
            <Price
              locale={locale}
              currency={currency}
              price={data?.price}
              sale={data?.saleValue}
              className='flex flex-row'
            />
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
            colors={data.colors.data}
            materials={data.materials.data}
            availableSizes={data.sizes.data}
          >
            <div className='mt-5 flex flex-col'>
              <Wishlist
                text={t(data?.inWishlist ? 'wishlist.added' : 'wishlist.add')}
                locale={locale}
                productId={data?.id}
                inWishlist={data?.inWishlist}
              />
              <div className='divider' />
              <AddCart data={cartData} isDisabled={data?.available} />
            </div>
          </ProductParams>
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
