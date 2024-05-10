import { auth } from '@/auth';
import { ProfileForm } from '@/components/forms';
import { PageLayout } from '@/components/layouts';
import { STRAPI_API_ROUTES } from '@/helpers/constants';
import { generateStrapiQuery } from '@/lib';
import { getStrapiData } from '@/services/strapi';
import { PageProps } from '@/types/app/page.types';

export default async function ProfilePage({ params }: PageProps) {
  const { locale } = params;

  const pageQP = generateStrapiQuery(STRAPI_API_ROUTES.me({ locale }));
  const session = await auth();

  const data = await getStrapiData('profile-page', pageQP, {
    token: session.accessToken,
  });

  return (
    <PageLayout className='container py-16'>
      <ProfileForm data={data?.formFields} state={session.user} />
    </PageLayout>
  );
}
