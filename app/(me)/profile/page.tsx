import { auth } from '@/auth';
import { ProfileForm } from '@/components/forms';
import { STRAPI_API_ROUTES } from '@/helpers/constants';
import { generateStrapiQuery } from '@/lib';
import { getStrapiData } from '@/services/strapi';

export default async function ProfilePage(params: any) {
  const session = await auth();
  const pageQP = generateStrapiQuery(STRAPI_API_ROUTES.me);
  const data = await getStrapiData('profile-page', pageQP, {
    token: session.accessToken,
  });

  return (
    <section>
      <ProfileForm data={data} state={session.user} />
    </section>
  );
}
