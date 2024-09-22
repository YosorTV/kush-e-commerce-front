import { Metadata } from 'next';

import { PageProps } from '@/types/app/page.types';
import { getWishlistProducts } from '@/services/api/get-wished-products';
import { auth } from '@/auth';
import ProductListGroup from '@/components/simple/ProductListGroup';
import { inWishlistDataAdatapter } from '@/adapters/product';
import { ProductListController } from '@/components/simple/ProductListController';

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

  const { data, meta } = await getWishlistProducts({
    locale,
    userId: Number(session.user.id),
    token: session.accessToken
  });

  const wishlist = inWishlistDataAdatapter(data?.[0]?.products?.data);
  const isLastPage = meta.pagination.page === meta.pagination.pageCount || !data.length;

  return (
    <section className='mt-10 flex w-full flex-col bg-info-content p-5'>
      <ProductListGroup data={wishlist} className='grid-cols-fluid' />
      {wishlist.length > 0 && (
        <ProductListController
          disabled={isLastPage}
          total={meta.pagination.total}
          perPage={meta?.pagination?.pageSize * 2}
        />
      )}
    </section>
  );
}
