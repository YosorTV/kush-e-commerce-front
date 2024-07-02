// import { Metadata } from 'next';
import { NextLink } from '@/components/elements';
import { PageLayout } from '@/components/layouts';
import { PageProps } from '@/types/app/page.types';

// export async function generateMetadata({
//   params,
// }: PageProps): Promise<Metadata> {
//   const { locale } = params;

//   const metaQP = generateStrapiQuery(STRAPI_API_ROUTES.meta({ locale }));
//   const { seo } = await getStrapiData('success-page', metaQP);

//   return {
//     title: {
//       default: `KUSH | ${seo?.metaTitle}`,
//       template: '%s | KUSH',
//     },
//     description: seo?.metaDescription,
//   };
// }

export default async function SuccessPage({ params }: PageProps) {
  const { locale } = params;

  // const pageQP = generateStrapiQuery(
  //   STRAPI_API_ROUTES.auth({ locale }).success
  // );

  // const data = await getStrapiData('success-page', pageQP);

  return (
    <PageLayout className='h-screen'>
      <div className='flex h-full flex-col items-center justify-center gap-y-2.5'>
        asda
        {/* <h1 className='text-center text-lg font-semibold'>{data.title}</h1>
        <p>{data.description}</p>
        <NextLink href={data?.redirectUrl?.url} className='link link-primary'>
          {data?.redirectUrl?.text}
        </NextLink> */}
      </div>
    </PageLayout>
  );
}
