import { RuleSection } from '@/components/complex/RuleSection';
import { PageLayout } from '@/components/layouts';
import { STRAPI_PAGES } from '@/helpers/constants';
import { getMetadata } from '@/services';
import { getPolicyData } from '@/services/api/get-policy';
import { PageProps } from '@/types/app/page.types';
import { Metadata } from 'next';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale } = props.params;

  const response = await getMetadata({ path: STRAPI_PAGES.policy, locale });

  return response;
}

export default async function PrivacyPolicy({ params }: PageProps) {
  const { locale } = params;

  const { data } = await getPolicyData({ locale });

  return (
    <PageLayout className='mt-16'>
      {data?.content && <RuleSection content={data?.content} title={data?.title} />}
    </PageLayout>
  );
}
