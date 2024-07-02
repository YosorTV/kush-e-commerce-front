'use client';

import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { usePathname, useRouter } from '@/lib/navigation';
import { cn, updateUrlParams } from '@/lib';
import { Button, Sidebar } from '@/components/elements';
import { useScreen } from '@/lib/hooks';

import { BiSolidArrowToBottom } from 'react-icons/bi';
import { RiListSettingsLine } from 'react-icons/ri';
import { useFilters } from '@/store';
import { FilterForm } from '@/components/forms';
import { useTranslations } from 'next-intl';

type TActiveTab = {
  title: string;
  slug: string;
};

export const ProductsController: FC<{
  tabs: any[];
  className?: string;
}> = ({ className, tabs }) => {
  const state = useFilters();
  const { md } = useScreen();
  const t = useTranslations('filter');

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // const [activeTab, setActiveTab] = useState<TActiveTab>({
  //   title: '',
  //   slug: '',
  // });

  // const handleTab = useCallback(
  //   (tab: any) => {
  //     setActiveTab(tab);

  //     const url = updateUrlParams(pathname, searchParams, 'category', tab.slug);
  //     router.replace(url);
  //   },
  //   [pathname, router, searchParams]

  // const printDesktopTab = useCallback(
  //   (tab: any) => {
  //     const isActive = tab.slug === activeTab.slug;
  //     return (
  //       <li key={tab.id} className={cn('group', { active: isActive })}>
  //         <Button
  //           title={tab.title}
  //           value={tab.slug}
  //           onClick={() => handleTab(tab)}
  //           className='text-sm !font-medium uppercase group-[.active]:underline group-[.active]:underline-offset-8 md:text-xl'
  //         >
  //           {tab?.title}
  //         </Button>
  //       </li>
  //     );
  //   },
  //   [activeTab.slug, handleTab]

  // const printMobileTab = useCallback(
  //   (tab: any) => {
  //     const isActive = tab.slug === activeTab.slug;
  //     return (
  //       <li key={tab.id} className={cn('group', { active: isActive })}>
  //         <Button
  //           title={tab.title}
  //           value={tab.slug}
  //           onClick={() => handleTab(tab)}
  //           className='flex justify-start font-medium uppercase group-[.active]:underline group-[.active]:underline-offset-8'
  //         >
  //           {tab?.title}
  //         </Button>
  //       </li>
  //     );
  //   },
  //   [activeTab.slug, handleTab]
  // );

  // const printTabs = useMemo(() => {
  //   return md ? (
  //     <ul className='flex gap-6 text-xl text-base-200'>
  //       {tabs.map(printDesktopTab)}
  //     </ul>
  //   ) : (
  //     <div className='dropdown dropdown-end'>
  //       <div
  //         tabIndex={0}
  //         role='button'
  //         className='flex gap-x-3 font-medium uppercase text-base-200 underline underline-offset-8'
  //       >
  //         {activeTab.title}
  //         <BiSolidArrowToBottom className='h-6 w-6 fill-base-200' />
  //       </div>
  //       <ul
  //         tabIndex={0}
  //         className='menu dropdown-content left-0 z-30 w-52 bg-base-100 shadow-md'
  //       >
  //         {tabs.map(printMobileTab)}
  //       </ul>
  //     </div>
  //   );
  // }, [activeTab.title, md, printDesktopTab, printMobileTab, tabs]);

  // useEffect(() => {
  //   handleTab({ title: tabs[0].title, slug: tabs[0].slug });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <nav className={className}>
      {/* {printTabs} */}
      <div className='flex items-center gap-x-3 underline underline-offset-8'>
        <Button
          className='text-sm !font-medium md:text-xl'
          onClick={state.onToggle}
        >
          {t('title')}
        </Button>
        <RiListSettingsLine className='h-6 w-6 fill-base-200 ' />
        <Sidebar
          opened={state.isOpen}
          onToggle={state.onToggle}
          position='right'
        >
          <FilterForm />
        </Sidebar>
      </div>
    </nav>
  );
};
