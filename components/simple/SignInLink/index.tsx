'use client';

import { NextLink } from '@/components/elements';
import { cn } from '@/lib';
import { usePathname } from '@/lib/navigation';
import { FC } from 'react';

export const SignInLink: FC<{ url: string; text: string }> = ({
  url,
  text,
}) => {
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
      {text}
    </NextLink>
  );
};
