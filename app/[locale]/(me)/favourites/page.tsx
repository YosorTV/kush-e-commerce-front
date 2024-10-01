import { Metadata } from 'next';

import { PageProps } from '@/types/app/page.types';
import { getWishlistProducts } from '@/services/api/get-wished-products';
import { auth } from '@/auth';
import ProductListGroup from '@/components/simple/ProductListGroup';
import { inWishlistDataAdatapter } from '@/adapters/product';
import { Title } from '@/components/elements';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale } = props.params;

  return {
    title: {
      default: `KUSH | ${locale === 'uk' ? 'Cписок бажань' : 'Wishlist'}`,
      template: '%s | KUSH'
    }
  };
}

export default async function FavouritesPage({ params, searchParams }: PageProps) {
  const { locale } = params;
  const { page = '1', pageSize = '5' } = searchParams;

  const session = await auth();
  const t = await getTranslations('system');

  const { data } = await getWishlistProducts({
    page,
    locale,
    pageSize,
    userId: Number(session.user.id),
    token: session.accessToken
  });

  if (!data) {
    return notFound();
  }

  const wishlist = inWishlistDataAdatapter(data?.[0]?.products?.data);

  return (
    <section className='mt-10 flex w-full flex-col bg-info-content p-5'>
      <Title level='2' variant='subheading' className='text-center'>
        {t('wishlist')}
      </Title>
      <div className='divider' />
      <ProductListGroup data={wishlist} className='grid-cols-fluid' />
    </section>
  );
}
