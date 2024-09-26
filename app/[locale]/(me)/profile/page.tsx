import { Metadata } from 'next';

import { ProfileForm } from '@/components/forms';

import { getProfileData } from '@/services';
import { PageProps } from '@/types/app/page.types';
import { auth } from '@/auth';
import { getMe } from '@/services/api/get-me';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale } = props.params;

  return {
    title: {
      default: `KUSH | ${locale === 'uk' ? 'Профіль' : 'Profile'}`,
      template: '%s | KUSH'
    }
  };
}

export default async function ProfilePage({ params }: PageProps) {
  const { locale } = params;

  const session = await auth();

  const { data } = await getProfileData({ locale, token: session.accessToken });
  const { data: me } = await getMe({ token: session.accessToken });

  return (
    <section className='flex w-full flex-col justify-center bg-info-content'>
      {data?.formFields && me && (
        <ProfileForm data={data.formFields} state={me} locale={locale} token={session.accessToken} />
      )}
    </section>
  );
}
