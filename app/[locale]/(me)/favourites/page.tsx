import { Metadata } from 'next';

import { PageProps } from '@/types/app/page.types';
import { getWishlistProducts } from '@/services/api/get-wished-products';
import { auth } from '@/auth';
import ProductListGroup from '@/components/simple/ProductListGroup';
import { inWishlistDataAdatapter } from '@/adapters/product';
import { PaginateController } from '@/components/simple/PaginateController';
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

export default async function FavouritesPage({ params }: PageProps) {
  const { locale } = params;

  const session = await auth();
  const t = await getTranslations('system');

  const { data, meta } = await getWishlistProducts({
    locale,
    userId: Number(session.user.id),
    token: session.accessToken
  });

  if (!data) {
    return notFound();
  }

  const wishlist = inWishlistDataAdatapter(data?.[0]?.products?.data);
  const isLastPage = meta.pagination.page === meta.pagination.pageCount || !data.length;

  return (
    <section className='mt-10 flex w-full flex-col bg-info-content p-5'>
      <Title level='2' variant='subheading' className='text-center'>
        {t('wishlist')}
      </Title>
      <div className='divider' />
      <ProductListGroup data={wishlist} className='grid-cols-fluid' />
      <div className='divider' />
      {wishlist.length > 0 && (
        <PaginateController
          disabled={isLastPage}
          total={meta.pagination.total}
          perPage={meta?.pagination?.pageSize + 5}
        />
      )}
    </section>
  );
}
