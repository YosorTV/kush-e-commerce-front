import { Metadata } from 'next';

import { ProfileForm } from '@/components/forms';
import { STRAPI_PAGES } from '@/helpers/constants';
import { getMetadata, getProfileData } from '@/services';
import { PageProps } from '@/types/app/page.types';
import { auth } from '@/auth';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale } = props.params;

  const response = await getMetadata({ path: STRAPI_PAGES.profile, locale });

  return response;
}

export default async function ProfilePage({ params }: PageProps) {
  const { locale } = params;

  const { accessToken: token, user } = await auth();

  const { data } = await getProfileData({ locale, token });

  return (
    <section className='w-full bg-info-content'>
      <ProfileForm data={data.formFields} state={user} />
    </section>
  );
}
