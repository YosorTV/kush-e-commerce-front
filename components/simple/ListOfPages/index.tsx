'use client';

import { FC } from 'react';
import { usePathname } from '@/lib/navigation';
import { NextLink } from '@/components/elements';

import { StrapiLinkType } from '@/types/components';
import { cn } from '@/lib';
import { ROOT } from '@/helpers/constants';

type ListOFPagesProps = {
  pages: StrapiLinkType[];
  className?: string;
  linkStyle?: string;
};

export const ListOfPages: FC<ListOFPagesProps> = ({
  pages,
  className,
  linkStyle,
}) => {
  const pathname = usePathname();

  if (!pages?.length) return null;

  const printLinks = (data: StrapiLinkType[]) => {
    return data.map((page) => {
      const isActive =
        page.url === ROOT
          ? pathname === page.url
          : pathname.startsWith(page.url);

      return (
        <li key={page.id} className={cn('group py-2.5', { active: isActive })}>
          <NextLink
            href={page.url}
            replace={page.isExternal}
            className={cn(
              'py-2.5 font-medium group-[.active]:underline group-[.active]:underline-offset-8',
              linkStyle
            )}
          >
            {page.text}
          </NextLink>
        </li>
      );
    });
  };

  return <ul className={cn('flex gap-x-6', className)}>{printLinks(pages)}</ul>;
};