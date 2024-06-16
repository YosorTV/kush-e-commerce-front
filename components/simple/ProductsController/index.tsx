'use client';

import { FC, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import { usePathname, useRouter } from '@/lib/navigation';
import { cn, updateUrlParams } from '@/lib';

export const ProductsController: FC<{
  tabs: any[];
  className?: string;
}> = ({ className, tabs }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('category');

  const handleTab = ({ target }: any) => {
    const url = updateUrlParams(
      pathname,
      searchParams,
      'category',
      target.value
    );

    router.replace(url);
  };

  useEffect(() => {
    handleTab({ target: { value: tabs[0].slug } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={className}>
      <ul className='flex gap-6 text-xl text-base-200'>
        {tabs.map((tab) => {
          const isActive = tab.slug === currentTab;
          return (
            <li key={tab.id} className={cn('group', { active: isActive })}>
              <button
                value={tab.slug}
                onClick={handleTab}
                className='font-medium uppercase group-[.active]:underline group-[.active]:underline-offset-8'
              >
                {tab?.title}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
