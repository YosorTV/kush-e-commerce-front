import { Metadata } from 'next';

import { ProfileForm } from '@/components/forms';

import { getProfileData } from '@/services';
import { PageProps } from '@/types/app/page.types';
import { auth } from '@/auth';
import { getMe } from '@/services/api/get-me';
import { Title } from '@/components/elements';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale } = props.params;

  return {
    title: {
      default: `KUSH | ${locale === 'uk' ? 'ПРОФІЛЬ' : 'PROFILE'}`,
      template: '%s | KUSH'
    }
  };
}

export default async function ProfilePage({ params }: PageProps) {
  const { locale } = params;

  const session = await auth();

  const t = await getTranslations('system');

  const { data } = await getProfileData({ locale, token: session.accessToken });
  const { data: me } = await getMe({ token: session.accessToken });

  return (
    <section className='mt-10 w-full bg-info-content p-5'>
      <Title level='2' variant='subheading' className='my-5 whitespace-nowrap text-center text-base'>
        {t('profile')}
      </Title>
      <div className='divider' />
      {data?.formFields && me && (
        <ProfileForm data={data.formFields} state={me} locale={locale} token={session.accessToken} />
      )}
    </section>
  );
}
