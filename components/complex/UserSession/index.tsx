import Image from 'next/image';

// import { NextLink } from '@/components/elements';
import { SignOutButton } from '@/components/simple/SignOutButton';
// import { StrapiLinkType } from '@/types/components';
import { SignInLink } from '@/components/simple';
import { cn } from '@/lib';

export const UserSession = ({
  cta,
  session,
  signOutTitle,
  // sessionLinks = [],
}: any) => {
  if (!session) {
    return <SignInLink {...cta} />;
  }

  // const printMenuLinks = (links: StrapiLinkType[]) => {
  //   return links.map((link: StrapiLinkType, index) => (
  //     <li tabIndex={index + 1} key={link.id}>
  //       <NextLink
  //         href={link.url}
  //         className='font-semibold capitalize hover:bg-none'
  //       >
  //         {link.text}
  //       </NextLink>
  //     </li>
  //   ));
  // };

  return (
    <nav className='flex items-center justify-end gap-x-5'>
      <div className='dropdown dropdown-end'>
        <div
          tabIndex={-1}
          className={cn(
            'flex cursor-pointer items-center justify-center gap-5',
            session.picture ? 'w-8' : 'w-full'
          )}
        >
          {session.picture ? (
            <Image
              src={session.picture}
              title={session.name}
              height={64}
              width={64}
              className='h-8 w-8 rounded-full'
              alt={`avatar-${session.name}`}
            />
          ) : (
            <span className='whitespace-nowrap font-semibold uppercase text-base-200'>
              {session.name}
            </span>
          )}
        </div>
        <ul
          tabIndex={0}
          className='menu dropdown-content top-8 min-w-btn space-y-2.5 rounded-sm bg-base-100 shadow'
        >
          {/* {printMenuLinks(sessionLinks)} */}
          <li tabIndex={3}>
            <SignOutButton text={signOutTitle} />
          </li>
        </ul>
      </div>
    </nav>
  );
};
