'use client';

import { FC, useState } from 'react';
import { Button } from '@/components/elements';
import { updateUrlParams } from '@/lib';
import { usePathname, useRouter } from '@/lib/navigation';
import { useSearchParams } from 'next/navigation';

import { useTranslations } from 'use-intl';

interface IProductListController {
  total: number;
  disabled: boolean;
  perPage?: number;
  onClick?: () => Promise<void>;
}

export const ProductListController: FC<IProductListController> = ({
  total,
  disabled,
  perPage = 8,
}) => {
  const [pageSize, setPageSize] = useState<number>(perPage);

  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const t = useTranslations('system');

  const handleMore = () => {
    setPageSize((prevSize) => prevSize + pageSize);

    const url = updateUrlParams(pathname, params, 'pageSize', String(pageSize));

    router.replace(url, { scroll: false });
  };

  return (
    <div className='flex flex-col items-center justify-center py-6 pb-10 lg:pt-16'>
      <span className='text-sm font-medium uppercase text-base-200'>
        {t('total', { number: total })}
      </span>
      <Button className='btn-link' disabled={disabled} onClick={handleMore}>
        {t('loadMore')}
      </Button>
    </div>
  );
};
