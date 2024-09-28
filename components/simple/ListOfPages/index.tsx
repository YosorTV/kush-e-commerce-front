'use client';

import { FC, useState, useMemo, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';

import { useFilters } from '@/store';

import { cn } from '@/lib';
import { useScreen } from '@/lib/hooks';
import { usePathname } from '@/lib/navigation';

import { NextLink, Portal } from '@/components/elements';

import { ROOT } from '@/helpers/constants';
import { StrapiLinkType } from '@/types/components';

import { navAnimations } from '@/assets/animations';

const SubMenu = dynamic(() => import('../SubMenu'), { ssr: false });

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
  isFooter?: boolean;
};

export const ListOfPages: FC<ListOFPagesProps> = ({
  pages,
  className,
  categories,
  collections,
  linkStyle,
  isFooter = false
}) => {
  const [showOverlay, setShowOverlay] = useState(false);

  const state = useFilters();
  const { lg } = useScreen();
  const pathname = usePathname();

  const isLgScreen = useMemo(() => {
    return lg && showOverlay;
  }, [lg, showOverlay]);

  const handleShowSubMenu = useCallback(() => {
    setShowOverlay(!state.isOpen && !isFooter);
  }, [state.isOpen, isFooter]);

  const printLink = (page: StrapiLinkType, index: number) => {
    const urlObj = new URL(page.url, process.env.NEXT_PUBLIC_URL);

    const isActive =
      urlObj.pathname === ROOT
        ? pathname === urlObj.pathname
        : pathname.startsWith(urlObj.pathname) || pathname.startsWith('collection');

    return (
      <li
        key={page.id}
        onMouseEnter={handleShowSubMenu}
        className={cn('group py-2.5 text-base-200 hover:underline hover:underline-offset-8', {
          active: isActive
        })}
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
      </li>
    );
  };

  useEffect(() => {
    setShowOverlay(false);
  }, [pathname]);

  if (!pages?.length) return null;

  return (
    <ul className={cn('flex gap-x-6', className)}>
      {pages.length > 0 && pages.map(printLink)}
      <Portal selector='portal'>
        <AnimatePresence mode='wait' initial={false}>
          {isLgScreen && (
            <motion.div
              initial='initial'
              animate='animate'
              exit='exit'
              variants={navAnimations}
              onHoverEnd={() => setShowOverlay(false)}
            >
              <SubMenu
                categoryTitle={categories?.title}
                collectionTitle={collections?.title}
                categories={categories?.data}
                collections={collections?.data}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </ul>
  );
};
