'use client';

import { SignOutButton } from '@/components/simple/SignOutButton';
import { SignInLink } from '@/components/simple';
import { StrapiLinkType } from '@/types/components';
import { NextLink } from '@/components/elements';
import { Avatar } from '@/components/elements/Avatar';

export default function UserSession({ cta, signOutTitle, session, locale, sessionLinks = [] }: any) {
  if (!session) {
    return <SignInLink {...cta} />;
  }

  const printMenuLinks = (links: StrapiLinkType[]) => {
    return links.map((link: StrapiLinkType, index) => (
      <li tabIndex={index + 1} key={link.id}>
        <NextLink href={link.url} className='font-semibold capitalize hover:bg-none'>
          {link.text}
        </NextLink>
      </li>
    ));
  };

  return (
    <nav className='flex items-center justify-end gap-x-5'>
      <div className='dropdown dropdown-end'>
        <div tabIndex={-1} className='flex w-full cursor-pointer items-center justify-center gap-5'>
          {session?.user && (
            <Avatar firstName={session?.user?.name || session?.user?.firstName} lastName={session?.user?.lastName} />
          )}
        </div>
        <ul tabIndex={0} className='menu dropdown-content top-8 min-w-btn space-y-2.5 rounded-sm bg-base-100 shadow'>
          {printMenuLinks(sessionLinks)}
          <li tabIndex={2}>
            <SignOutButton text={signOutTitle} />
          </li>
        </ul>
      </div>
    </nav>
  );
}
