import { NextLink } from '@/components/elements';

import Image from 'next/image';
import { SignOutButton } from '../SignOutButton';
import { StripeLinkType } from '@/types/components';

export const UserSession = ({
  authorized,
  cta,
  session,
  sessionLinks,
}: any) => {
  if (!authorized) {
    return (
      <NextLink href={cta.url} className='btn btn-ghost text-black'>
        {cta.text}
      </NextLink>
    );
  }

  const printMenuLinks = (links: StripeLinkType[]) => {
    return links.map((link: StripeLinkType, index) => (
      <li tabIndex={index + 1} key={link.id}>
        <NextLink
          href={link.url}
          className='font-semibold capitalize text-black hover:bg-none'
        >
          {link.text}
        </NextLink>
      </li>
    ));
  };

  return (
    <nav className='flex flex-1 items-center justify-end gap-x-5'>
      <div className='dropdown dropdown-end'>
        <figure
          tabIndex={-1}
          className='flex cursor-pointer items-center justify-center gap-5'
        >
          <figcaption className='text-black'>{session.name}</figcaption>
          {session?.avatar && (
            <Image
              src={session?.avatar}
              height={100}
              width={100}
              className='h-8 w-8 rounded-full'
              alt='profile-picture'
            />
          )}
        </figure>
        <ul
          tabIndex={0}
          className='menu dropdown-content top-8 min-w-btn space-y-2.5 rounded-sm bg-slate-200 shadow'
        >
          {printMenuLinks(sessionLinks)}
          <li tabIndex={3}>
            <SignOutButton />
          </li>
        </ul>
      </div>
    </nav>
  );
};
