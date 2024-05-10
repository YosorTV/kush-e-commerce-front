import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

import { NextLink } from '@/components/elements';
import { SignOutButton } from '@/components/simple/SignOutButton';
import { StripeLinkType } from '@/types/components';

export const UserSession = async ({
  authorized = false,
  locale,
  cta,
  session,
  sessionLinks = [],
}: any) => {
  const t = await getTranslations({ locale, namespace: 'auth' });

  if (!authorized) {
    return (
      cta && (
        <NextLink href={cta.url} className='btn btn-ghost'>
          {cta.text}
        </NextLink>
      )
    );
  }

  const printMenuLinks = (links: StripeLinkType[]) => {
    return (
      links.length &&
      links.map((link: StripeLinkType, index) => (
        <li tabIndex={index + 1} key={link.id}>
          <NextLink
            href={link.url}
            className='font-semibold capitalize hover:bg-none'
          >
            {link.text}
          </NextLink>
        </li>
      ))
    );
  };

  return (
    <nav className='flex flex-1 items-center justify-end gap-x-5'>
      <div className='dropdown dropdown-end'>
        <div
          tabIndex={-1}
          className='flex cursor-pointer items-center justify-center gap-5'
        >
          <span className='font-semibold uppercase text-base-200'>
            {session.name}
          </span>
          {session.avatar && (
            <Image
              src={session.avatar}
              height={100}
              width={100}
              className='h-8 w-8 rounded-full'
              alt='profile-picture'
            />
          )}
        </div>
        <ul
          tabIndex={0}
          className='menu dropdown-content top-8 min-w-btn space-y-2.5 rounded-sm bg-base-100 shadow'
        >
          {printMenuLinks(sessionLinks)}
          <li tabIndex={3}>
            <SignOutButton text={t('signOut')} />
          </li>
        </ul>
      </div>
    </nav>
  );
};
