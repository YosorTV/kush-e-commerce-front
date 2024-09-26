import { FC } from 'react';

import { cormorant } from '@/assets/fonts';
import { Title } from '@/components/elements';
import { cn } from '@/lib';
import { MenuItem } from '../Menu/MenuItem';
import { CategoryLinkType } from '@/types/components';

import dynamic from 'next/dynamic';

const CollectionCarousel = dynamic(() => import('../CollectionCarousel'), { ssr: false });

type TSubMenu = {
  categoryTitle: string;
  categories: CategoryLinkType[];
  collectionTitle?: string;
  collections?: any[];
};

const SubMenu: FC<TSubMenu> = ({ categoryTitle, categories, collections, collectionTitle }) => {
  return (
    <nav className='fixed left-0 top-16 z-10 flex h-80 w-full gap-x-20 bg-info-content px-5'>
      <div className='relative top-5 flex flex-col gap-y-2.5'>
        {categoryTitle && (
          <Title level='5' className={cn('text-xl uppercase text-base-200', cormorant.className)}>
            {categoryTitle}
          </Title>
        )}
        {categories?.length > 0 && (
          <ul className='flex flex-col gap-y-4 py-1.5 capitalize text-base-200'>
            {categories.map((category: any) => (
              <MenuItem
                id={category.id}
                key={category.id}
                text={category.title}
                slug={category.slug}
                url={`/catalog?categories=${category.slug}`}
                isExternal={false}
              />
            ))}
          </ul>
        )}
      </div>
      {collections && collections.length > 0 && (
        <div className='flex w-full justify-between gap-5 gap-x-6'>
          <CollectionCarousel
            format='mini'
            data={collections}
            title={collectionTitle}
            fill='fill-base-200'
            titleClass='!text-xl'
            slideClass='h-60 p-0'
            className='relative top-2.5 ml-auto w-full'
          />
        </div>
      )}
    </nav>
  );
};

export default SubMenu;
