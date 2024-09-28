import { getTranslations } from 'next-intl/server';

import { NextLink, Title } from '@/components/elements';
import { PageProps } from '@/types/app/page.types';
import { Metadata } from 'next';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale } = props.params;

  return {
    title: {
      default: `KUSH | ${locale === 'uk' ? 'НЕ ЗНАЙДЕНО' : 'NOT FOUND'}`,
      template: '%s | KUSH'
    }
  };
}

export default async function NotFoundPage() {
  const t = await getTranslations('notFound');

  return (
    <section className='flex h-screen flex-col items-center justify-center gap-5 text-center'>
      <span className='text-6xl font-bold'>404</span>
      <Title level='2' variant='subheading' className='mb-4 text-xl'>
        {t('message')}
      </Title>
      <NextLink href='/' className='btn btn-primary text-base-100'>
        {t('return')}
      </NextLink>
    </section>
  );
}
