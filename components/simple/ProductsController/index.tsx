'use client';

import { FC, useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import { usePathname, useRouter } from '@/lib/navigation';
import { cn, updateUrlParams } from '@/lib';
import { Button, Sidebar } from '@/components/elements';
import { useScreen } from '@/lib/hooks';

import { BiSolidArrowToBottom } from 'react-icons/bi';
import { RiListSettingsLine } from 'react-icons/ri';
import { useFilters } from '@/store';

export const ProductsController: FC<{
  tabs: any[];
  className?: string;
}> = ({ className, tabs }) => {
  const state = useFilters();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('category');

  const { md } = useScreen();

  const handleTab = useCallback(
    ({ target }: any) => {
      const url = updateUrlParams(
        pathname,
        searchParams,
        'category',
        target.value
      );

      router.replace(url);
    },
    [pathname, router, searchParams]
  );

  const printDesktopTab = useCallback(
    (tab: any) => {
      const isActive = tab.slug === currentTab;
      return (
        <li key={tab.id} className={cn('group', { active: isActive })}>
          <Button
            value={tab.slug}
            onClick={handleTab}
            className='text-sm !font-medium uppercase group-[.active]:underline group-[.active]:underline-offset-8 md:text-xl'
          >
            {tab?.title}
          </Button>
        </li>
      );
    },
    [currentTab, handleTab]
  );

  const printMobileTab = useCallback(
    (tab: any) => {
      const isActive = tab.slug === currentTab;
      return (
        <li key={tab.id} className={cn('group', { active: isActive })}>
          <Button
            value={tab.slug}
            onClick={handleTab}
            className='flex justify-start font-medium uppercase group-[.active]:underline group-[.active]:underline-offset-8'
          >
            {tab?.title}
          </Button>
        </li>
      );
    },
    [currentTab, handleTab]
  );

  const printTabs = useMemo(() => {
    return md ? (
      <ul className='flex gap-6 text-xl text-base-200'>
        {tabs.map(printDesktopTab)}
      </ul>
    ) : (
      <div className='dropdown dropdown-end'>
        <div
          tabIndex={0}
          role='button'
          className='flex gap-x-3 font-medium uppercase text-base-200 underline underline-offset-8'
        >
          {currentTab}
          <BiSolidArrowToBottom className='h-6 w-6 fill-base-200' />
        </div>
        <ul
          tabIndex={0}
          className='menu dropdown-content left-0 z-30 w-52 bg-base-100 shadow-md'
        >
          {tabs.map(printMobileTab)}
        </ul>
      </div>
    );
  }, [currentTab, md, printDesktopTab, printMobileTab, tabs]);

  useEffect(() => {
    handleTab({ target: { value: tabs[0].slug } });
  }, []);

  return (
    <nav className={className}>
      {printTabs}
      <div className='flex items-center gap-x-3 underline underline-offset-8'>
        <Button
          className='text-sm !font-medium md:text-xl'
          onClick={state.onToggle}
        >
          Filtres / Sort
        </Button>
        <RiListSettingsLine className='h-6 w-6 fill-base-200 ' />
        <Sidebar
          opened={state.isOpen}
          onToggle={state.onToggle}
          position='right'
        >
          Form
        </Sidebar>
      </div>
    </nav>
  );
};
