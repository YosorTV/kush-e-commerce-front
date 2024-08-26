'use client';

import { useCallback } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

import { Button } from '@/components/elements';
import { CloseIcon } from '@/assets/icons';
import { useTranslations } from 'next-intl';

const CategoryFilterButton = () => {
  const t = useTranslations('category');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categories = searchParams.getAll('categories');

  const handleRemoveCategory = useCallback(
    (categoryToRemove: string) => {
      const updatedCategories = categories.filter((category) => category !== categoryToRemove);

      const params = new URLSearchParams(searchParams.toString());
      params.delete('categories');

      updatedCategories.forEach((category) => {
        params.append('categories', category);
      });

      router.push(`${pathname}?${params.toString()}`, {
        scroll: false
      });
    },
    [categories, pathname, router, searchParams]
  );

  const printCategoryButton = (category: string) => (
    <Button
      key={category}
      className='btn-link'
      onClick={() => handleRemoveCategory(category)}
      icon={{ after: <CloseIcon /> }}
    >
      {t(category)}
    </Button>
  );

  if (categories.length === 0) return null;

  return <div className='space-x-2'>{categories.map(printCategoryButton)}</div>;
};

export default CategoryFilterButton;
