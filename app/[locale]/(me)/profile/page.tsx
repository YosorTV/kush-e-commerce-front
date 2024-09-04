import { Metadata } from 'next';

import { ProfileForm } from '@/components/forms';
import { STRAPI_PAGES } from '@/helpers/constants';
import { getMetadata, getProfileData } from '@/services';
import { PageProps } from '@/types/app/page.types';
import { auth } from '@/auth';
import { getMe } from '@/services/api/get-me';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale } = props.params;

  const response = await getMetadata({ path: STRAPI_PAGES.profile, locale });

  return response;
}

export default async function ProfilePage({ params }: PageProps) {
  const { locale } = params;

  const session = await auth();

  const { data } = await getProfileData({ locale, token: session.accessToken });
  const { data: me } = await getMe({ token: session.accessToken });

  return (
    <section className='flex w-full flex-col justify-center bg-info-content'>
      <ProfileForm data={data.formFields} state={me} locale={locale} token={session.accessToken} />
    </section>
  );
}
