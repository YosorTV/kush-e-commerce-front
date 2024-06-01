'use client';

import { FC } from 'react';

import { NextLink } from '@/components/elements';
import { cn } from '@/lib';
import { usePathname } from '@/lib/navigation';
import { UserIcon } from '@/assets/icons';

import { StrapiLinkType } from '@/types/components';

export const SignInLink: FC<StrapiLinkType> = ({ url }) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(url);

  return (
    <NextLink
      href={url}
      className={cn(
        'py-2.5 font-medium text-base-200',
        isActive && 'underline underline-offset-8'
      )}
    >
      <UserIcon />
    </NextLink>
  );
};
