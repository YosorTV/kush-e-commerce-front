'use client';

import { FC } from 'react';
import { useSearchParams } from 'next/navigation';

import { cn } from '@/lib';
import { usePathname } from '@/lib/navigation';

import { ROOT } from '@/helpers/constants';

import { NextLink } from '@/components/elements';

import { CategoryLinkType } from '@/types/components';

export const MenuItem: FC<CategoryLinkType> = ({
  text,
  url,
  slug,
  isExternal,
  className,
}) => {
  const pathname = usePathname();
  const params = useSearchParams();

  const category = params.get('category');

  const isActive =
    url === ROOT
      ? pathname === url
      : pathname.startsWith(url) || category === slug;

  return (
    <li className={cn('group', { active: isActive }, className)}>
      <NextLink
        href={url}
        replace={isExternal}
        className='py-2.5 font-medium capitalize text-base-200 group-[.active]:underline group-[.active]:underline-offset-8'
      >
        {text}
      </NextLink>
    </li>
  );
};
