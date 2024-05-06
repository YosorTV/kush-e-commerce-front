import { auth } from '@/auth';
import { ProfileForm } from '@/components/forms';
import { STRAPI_API_ROUTES } from '@/helpers/constants';
import { generateStrapiQuery } from '@/lib';
import { getStrapiData } from '@/services/strapi';
import { PageProps } from '@/types/app/page.types';

export default async function ProfilePage({ searchParams }: PageProps) {
  const { locale } = searchParams;

  const pageQP = generateStrapiQuery(STRAPI_API_ROUTES.me({ locale }));
  const session = await auth();

  const data = await getStrapiData('profile-page', pageQP, {
    token: session.accessToken,
  });

  return (
    <section className='container h-full pt-10'>
      <ProfileForm data={data?.formFields} state={session.user} />
    </section>
  );
}
