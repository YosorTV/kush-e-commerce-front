import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PageLayout } from '@/components/layouts';
import { RuleSection } from '@/components/complex/RuleSection';

import { getMetadata } from '@/services';
import { getTermData } from '@/services/api/get-terms';

import { STRAPI_PAGES } from '@/helpers/constants';

import { PageProps } from '@/types/app/page.types';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale } = props.params;

  const response = await getMetadata({ path: STRAPI_PAGES.term, locale });

  return response;
}

export default async function TermsConditions({ params }: PageProps) {
  const { locale } = params;

  const { data } = await getTermData({ locale });

  if (!data) {
    return notFound();
  }

  return (
    <PageLayout className='mt-16'>
      {data?.content && <RuleSection content={data?.content} title={data?.title} />}
    </PageLayout>
  );
}
