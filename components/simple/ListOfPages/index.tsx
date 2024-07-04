'use client';

import { FC, useState } from 'react';
import { motion } from 'framer-motion';

import { useFilters } from '@/store';

import { cn } from '@/lib';
import { usePathname } from '@/lib/navigation';

import { ROOT } from '@/helpers/constants';

import { NextLink } from '@/components/elements';
import { SubMenu } from '../SubMenu';

import { StrapiLinkType } from '@/types/components';

type ListOFPagesProps = {
  pages: StrapiLinkType[];
  className?: string;
  collections: {
    title: string;
    data: any[];
  };
  categories: {
    title: string;
    data: any[];
  };
  linkStyle?: string;
};

export const ListOfPages: FC<ListOFPagesProps> = ({
  pages,
  className,
  categories,
  collections,
  linkStyle,
}) => {
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  const state = useFilters();
  const pathname = usePathname();

  const handleShowSubMenu = (index: number) => {
    !state.isOpen && index <= 1 ? setShowOverlay(true) : setShowOverlay(false);
  };

  const printLinks = (data: StrapiLinkType[]) => {
    return data.map((page, index) => {
      const urlObj = new URL(page.url, process.env.NEXT_PUBLIC_URL);

      const isActive =
        urlObj.pathname === ROOT
          ? pathname === urlObj.pathname
          : pathname.startsWith(urlObj.pathname);

      return (
        <motion.li
          key={page.id}
          onHoverStart={() => handleShowSubMenu(index)}
          className={cn('group py-2.5 text-base-200', { active: isActive })}
        >
          <NextLink
            href={page.url}
            replace={page.isExternal}
            className={cn(
              'whitespace-nowrap py-2.5 font-medium group-[.active]:underline group-[.active]:underline-offset-8',
              linkStyle
            )}
          >
            {page.text}
          </NextLink>
        </motion.li>
      );
    });
  };

  if (!pages?.length) return null;

  return (
    <>
      <ul className={cn('flex gap-x-6', className)}>{printLinks(pages)}</ul>
      <SubMenu
        isHovered={showOverlay}
        onHoverEnd={() => setShowOverlay(false)}
        categoryTitle={categories?.title}
        collectionTitle={collections?.title}
        categories={categories?.data}
        collections={collections?.data}
      />
    </>
  );
};
