import { Metadata } from 'next';

import { getOrdersData } from '@/services';
import { PageProps } from '@/types/app/page.types';
import { auth } from '@/auth';
import OrdersSection from '@/components/complex/OrdersSection';

import { getTranslations } from 'next-intl/server';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale } = props.params;

  return {
    title: {
      default: `KUSH | ${locale === 'uk' ? 'Замовлення' : 'Orders'}`,
      template: '%s | KUSH'
    }
  };
}

export default async function OrdersPage({ params }: PageProps) {
  const { locale } = params;

  const session = await auth();
  const t = await getTranslations('system');
  const { data } = await getOrdersData({ locale, email: session.user.email, token: session?.accessToken });

  return (
    <section className='mt-10 w-full bg-info-content p-5'>
      <OrdersSection orders={data} emptyTitle={t('emptyList')} />
    </section>
  );
}
