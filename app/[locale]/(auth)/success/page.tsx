import { Metadata } from 'next';
import { NextLink } from '@/components/elements';
import { PageLayout } from '@/components/layouts';
import { PageProps } from '@/types/app/page.types';
import { STRAPI_PAGES } from '@/helpers/constants';
import { getMetadata, getSuccessData } from '@/services';
export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale } = props.params;

  const response = await getMetadata({ path: STRAPI_PAGES.success, locale });

  return response;
}

export default async function SuccessPage({ params }: PageProps) {
  const { locale } = params;

  const { data } = await getSuccessData({ locale });

  return (
    <PageLayout className='auth-page_wrapper' cover={data.cover}>
      <div className='z-10 flex h-1/2 w-11/12 flex-col items-center justify-center gap-y-2.5 rounded-md bg-base-100 p-5 shadow-2xl lg:w-1/2'>
        <h1 className='text-sm font-semibold xs:text-lg'>{data.title}</h1>
        <p className='whitespace-pre-line break-words pb-5 text-sm xs:text-lg'>
          {data.description}
        </p>
        <NextLink
          href={data?.redirect.url}
          className='btn mx-auto rounded-md text-xs text-base-100 xs:text-base'
        >
          {data?.redirect.text}
        </NextLink>
      </div>
    </PageLayout>
  );
}
