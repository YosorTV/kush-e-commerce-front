import { auth } from '@/auth';
import { ProfileForm } from '@/components/forms';
import { STRAPI_API_ROUTES } from '@/helpers/constants';
import { generateStrapiQuery } from '@/lib';
import { getStrapiData } from '@/services/strapi';

export default async function ProfilePage(params: any) {
  const pageQP = generateStrapiQuery(STRAPI_API_ROUTES.me);
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
