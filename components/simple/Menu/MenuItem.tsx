'use client';

import { FC } from 'react';
import { useSearchParams } from 'next/navigation';

import { cn } from '@/lib';
import { usePathname } from '@/lib/navigation';

import { ROOT } from '@/helpers/constants';

import { NextLink } from '@/components/elements';

import { CategoryLinkType } from '@/types/components';

export const MenuItem: FC<CategoryLinkType> = ({ text, url, slug, isExternal, className }) => {
  const pathname = usePathname();
  const params = useSearchParams();

  const category = params.get('category');

  const isActive = url === ROOT ? pathname === url : pathname.startsWith(url) || category === slug;

  return (
    <li className={cn('group', { active: isActive }, className)}>
      <NextLink
        href={url}
        replace={isExternal}
        className='py-2.5 text-sm font-medium capitalize text-base-200 underline-offset-8 group-[.active]:underline hover:underline'
      >
        {text}
      </NextLink>
    </li>
  );
};
